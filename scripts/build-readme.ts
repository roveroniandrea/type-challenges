import * as ts from "typescript";
import { ChallengesByDifficulty, DIFFICULTY, Difficulty } from './types';
import { handleBadgesMarkdown } from './to-badge';
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

/** Runs ts for all found challenges, returning all the filenames with no errors */
function compile(fileNames: string[], options: ts.CompilerOptions): string[] {
    // Running tsc
    const program = ts.createProgram(fileNames, options);
    const emitResult = program.emit();

    // Retrieving all diagnostics (errors/warnings etc)
    const allDiagnostics: ts.Diagnostic[] = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    // Creating a Set with all filenames that have at least an error diagnostic
    const filesWithDiagnostic: Set<string> = new Set<string>(allDiagnostics.reduce<string[]>((acc, d) => {
        if (d.category === ts.DiagnosticCategory.Error && d.file) {
            acc.push(d.file.fileName);
        }
        return acc;
    }, []));

    // Returning all files with no errors. Also excluding test-utils.ts
    return fileNames.filter(filename => !filesWithDiagnostic.has(filename) && filename !== "test-utils.ts");
}

/** Returns all completed challenges names */
function getCompletedChallenges(): string[] {
    // Retrieving tsconfig.json in order to run challenges with right flags
    const configFileName = ts.findConfigFile(
        "../",
        ts.sys.fileExists,
        "tsconfig.json"
    );

    if (configFileName) {
        const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);

        const compilerOptions = ts.parseJsonConfigFileContent(
            configFile.config,
            ts.sys,
            "./"
        );

        // Retrieving only completed challenges (files with no errors)
        const completedChallenges: string[] = compile(compilerOptions.fileNames, compilerOptions.options);

        return completedChallenges;
    }
    else {
        // If tsconfig.json is not found, throw an error
        throw new Error("tsconfig.json not found");
    }
}

/** Groups each challenge based on his difficulty. Difficulty level is found in the challenge name */
function groupChallenges(challengeFullNames: string[]): ChallengesByDifficulty[] {
    const result: ChallengesByDifficulty[] = (<Difficulty[]>[DIFFICULTY.warm, DIFFICULTY.easy, DIFFICULTY.medium, DIFFICULTY.hard, DIFFICULTY.extreme]).map(difficulty => {
        const regexp = new RegExp(`^([0-9]+)-${difficulty}-(.+)\\.ts$`, "g");

        return {
            difficulty: difficulty,
            challenges: challengeFullNames.reduce<ChallengesByDifficulty["challenges"]>((acc, challenge) => {
                const matches = [...challenge.matchAll(regexp)];
                if (matches?.length) {
                    // Also retrieving challenge index and name from the full challenge name
                    const [, challengeIndex, challengeName] = matches[0];

                    acc.push({
                        index: parseInt(challengeIndex),
                        name: challengeName,
                        fullName: challenge.replace(".ts", "")
                    });
                }
                return acc;
            }, [])
        }
    });

    return result;
}

const README_PATH = path.join(__dirname, "../readme.md");

/** Updates the readme file with markdown from input */
function buildReadme(markdown: string): void {
    // Reading readme content
    const readmeContent: string = readFileSync(README_PATH, "utf-8");
    const regexp = /^(.*<!--challenges-start-->).*(<!--challenges-end-->.*)$/gs;
    const matches = [...readmeContent.matchAll(regexp)];
    if (matches.length) {
        // Slicing the readme based on markers
        const [, firstSlice, lastSlice] = matches[0];

        // Injecting new markdown between slices
        const newReadme: string = `${firstSlice}\n${markdown}\n${lastSlice}`;

        // Writing file
        writeFileSync(README_PATH, newReadme);
    }
    else {
        // If readme.md does is not in the specified format, throw an error
        throw new Error("Invalid readme.md");
    }
}

const challenges = getCompletedChallenges();
const challengesByDifficulty: ChallengesByDifficulty[] = groupChallenges(challenges);
const markdownToApply: string = handleBadgesMarkdown(challengesByDifficulty);
buildReadme(markdownToApply);
