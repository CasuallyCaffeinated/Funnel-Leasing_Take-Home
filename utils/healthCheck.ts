/**
 * API returns a value every 10 seconds.
 * Therefore, six entries every minute.
 * Need to take the last six values returned from the API.
 */
// const healthStatus = (altitudeAvg: number[]): string => {
// 	// Grab last six elements of the array and make a shallow copy of it.
// 	const numbers: number[] = [...altitudeAvg.slice(-6)];
// 	// const numbers2: number[] = altitudeAvg.slice(-6);
// 	// console.log('OP 1', Math.min(...altitudeAvg.slice(-6)));
// 	// console.log('OP 2', Math.min(...numbers));
// 	// console.log('OP 3', Math.min(...numbers2));
// let aMinuteAgo = new Date(Date.now() - 1000 * 60);
// console.log('THIS IS THE TIME MINUS ONE MINUTE', aMinuteAgo, typeof aMinuteAgo); // 4:36

// 	if (numbers.length && Math.max(...numbers.slice(-6)) < 160) {
// 		return `WARNING: RAPID ORBITAL DECAY IMMINENT`;
// 	} else if (
// 		numbers.length &&
// 		checkSustainedStatus(numbers) &&
// 		(Math.min(...numbers.slice(-6)) >= 160)
// 	) {
// 		return `Sustained Low Earth Orbit Resumed`;
// 	} else {
// 		return `Altitude is A-OK`;
// 	}
// };
import { oneMinutePassed } from '../api/getData';

export let flag: boolean;

const healthStatus = (altitudeAvg: number[]): string => {
    const numbers: number[] = [...altitudeAvg.slice(-6)];

    if (checkForAvg(numbers.slice(-6)) < 160) {
        return `WARNING: RAPID ORBITAL DECAY IMMINENT`;
    } else if (checkSustainedStatus(numbers)) {
        return `Sustained Low Earth Orbit Resumed`;
    } else if (oneMinutePassed) {
        return `Altitude is A-OK`;
    }
};

const checkSustainedStatus = (numbers: number[]): boolean => {
    for (let i = 0; i < numbers.length - 6; i++) {
        let current = numbers[i];
        let sixNums = [...numbers.slice(i, i + 6)];
        let avgOfSix = checkForAvg(sixNums);
        if (current <= 160 && Math.max(avgOfSix) <= 160) {
            return true;
        }
    }
    return false;
    // for (let i = numbers.length - 1; i >= 0; i--) {
    // 	let current = numbers[i];
    // 	let avgOfSix = checkForAvg(numbers.slice(i - 5, i + 1));
    // 	if (current >= 160 && avgOfSix >= 160) {
    // 		return true;
    // 	}
    // }
    // return false;
};

const checkAvgForLastMinute = () => {};

export const checkForAvg = (array: number[]): number => {
    let number: number = array.reduce((prev, current) => prev + current, 0);
    let avg: number = number / array.length;
    return avg;
};

// const numberArr: number[] = [];

// const getLastSixValues = (altitudeArray: number[]): number[] => {
// 	let arrayLength = altitudeArray.length;
// 	for (let i = arrayLength - 1; i >= arrayLength - 6; i--) {
// 		numberArr.push(altitudeArray[i]);
// 	}
// 	return numberArr;
// };

export default healthStatus;
