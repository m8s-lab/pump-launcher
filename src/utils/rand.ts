export const getRandomFloat = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
