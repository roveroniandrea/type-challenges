import { ChallengesByDifficulty, Difficulty } from './types'

function toBadgeURL(label: string, text: string, color: string, args = '') {
    return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, '--'))}-${encodeURIComponent(text.replace(/-/g, '--'))}-${color}${args}`
}

function toBadge(label: string, text: string, color: string, args = '') {
    return `<img src="${toBadgeURL(label, text, color, args)}" alt="${text}"/>`
}

function toBadgeLink(url: string, label: string, text: string, color: string, args = '') {
    return `<a href="${url}" target="_blank">${toBadge(label, text, color, args)}</a> `
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    warm: 'teal',
    easy: '7aad0c',
    medium: 'd9901a',
    hard: 'de3d37',
    extreme: 'b11b8d',
}

const getChallengeUrl = (fullname: string) => `github.com/type-challenges/type-challenges/blob/main/questions/${fullname}/README.md`

/** Generates the markdown text that needs to be inserted in order to correctly render all the challenges with respective badge */
export function handleBadgesMarkdown(challenges: ChallengesByDifficulty[]): string {
    return challenges
        .filter(difficultyGroup => difficultyGroup.challenges.length)
        .map(difficultyGroup => {
            const difficultyBadge: string = toBadge(difficultyGroup.difficulty, `${difficultyGroup.challenges.length}`, DIFFICULTY_COLORS[difficultyGroup.difficulty]);

            const challengeBadges: string = difficultyGroup.challenges.map(challenge => {
                const challengeFormattedName: string = `${challenge.index}・${challenge.name}`;

                return toBadgeLink(getChallengeUrl(challenge.fullName), '', challengeFormattedName, DIFFICULTY_COLORS[difficultyGroup.difficulty]);
            }).join('');

            return `${difficultyBadge}\n<br>\n${challengeBadges}`;

        }).join('\n<br><br>\n');
}