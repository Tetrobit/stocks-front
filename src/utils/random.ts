export function randomInt(a: number, b: number) {
    return a + Math.floor(Math.random() * (b - a + 1))
}

export function randomIdx(length: number) {
    return Math.floor(Math.random() * length)
}
