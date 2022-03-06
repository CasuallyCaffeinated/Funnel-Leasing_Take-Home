export const getAvgFromArray = (array: number[]): number => {
    let number: number = array.reduce((prev, current) => prev + current, 0);
    let avg: number = number / array.length;
    return avg;
};
