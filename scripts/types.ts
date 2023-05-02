export type Difficulty = "warm" | "easy" | "medium" | "hard" | "extreme";

export const DIFFICULTY: { [K in Difficulty]: K } = {
    "warm": "warm",
    "easy": "easy",
    "medium": "medium",
    "hard": "hard",
    "extreme": "extreme"
}

export type ChallengesByDifficulty = {
    difficulty: Difficulty;
    challenges: Array<{
        index: number;
        name: string;
        fullName: string;
    }>;
};