import * as ts from "typescript";

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
        const completedChallenges: string[] = compile(compilerOptions.fileNames, compilerOptions.options);

        console.log(completedChallenges);

        return completedChallenges;
    }
    else {
        throw new Error("tsconfig.json not found");
    }
}

getCompletedChallenges();