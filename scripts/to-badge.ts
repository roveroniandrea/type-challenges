function toBadgeURL(label: string, text: string, color: string, args = '') {
    return `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, '--'))}-${encodeURIComponent(text.replace(/-/g, '--'))}-${color}${args}`
}

function toBadge(label: string, text: string, color: string, args = '') {
    return `<img src="${toBadgeURL(label, text, color, args)}" alt="${text}"/>`
}

export function toBadgeLink(url: string, label: string, text: string, color: string, args = '') {
    return `<a href="${url}" target="_blank">${toBadge(label, text, color, args)}</a> `
}