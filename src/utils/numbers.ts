export function randomID() {
    return randomNumber(1, 999).toString();
}

export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}