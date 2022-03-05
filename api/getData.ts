import fetch from 'node-fetch';
import { Satellite } from './satellite.model';
import { URL } from './api';

const SUSTAINED = `Sustained Low Earth Orbit Resumed`;
const WARNING = `WARNING: RAPID ORBITAL DECAY IMMINENT`;
const OK = `Altitude is A-OK`;

export const appStateStats = {
    altitudesDataArray: [],
    altitudeAvg: undefined,
    oneMinutePassedSinceOrbitalDecay: false,
    sustainedStatusStartTime: undefined,
    inOrbitalDecayInLastMinute: undefined,
    sustainedTimer: undefined,
    sustainedTimerRunning: false,
};

const startSustainedTimer = () => {
    appStateStats.sustainedTimerRunning = true;
    const timer = setTimeout(() => {
        appStateStats.inOrbitalDecayInLastMinute = false;
        appStateStats.sustainedTimerRunning = false;
    }, 60000);

    appStateStats.sustainedTimer = timer;
};

const clearSustainedTimer = () => {
    appStateStats.sustainedTimerRunning = false;
    clearTimeout(appStateStats.sustainedTimer);
};

export const initSatelliteDataService = () => {
    setInterval(setAltitudesArray, 10000);
};

/**
 * Reduces nums in array, and returns the average.
 * @returns An array of numbers, the altitudes from the API.
 */
export async function setAltitudesArray(): Promise<void> {
    try {
        // Await the API object.
        const apiDataObject = await getSatelliteData();

        if (apiDataObject?.altitude) {
            if (appStateStats.altitudesDataArray.length <= 30) {
                appStateStats.altitudesDataArray.push(apiDataObject?.altitude);
            } else if (appStateStats.altitudesDataArray.length > 30) {
                appStateStats.altitudesDataArray
                    .splice(0, 1)
                    .push(apiDataObject?.altitude);
            }
        }

        // Get the average value of all the altitudes and keep track of that value
        appStateStats.altitudeAvg =
            appStateStats.altitudesDataArray.reduce(
                (prev, curr) => prev + curr,
                0
            ) / appStateStats.altitudesDataArray.length;
    } catch (e) {
        throw e;
    }
}

// Fetches data from API
export async function getSatelliteData(): Promise<Satellite> {
    try {
        // Get Data from API, and return JSON.
        const response = await fetch(URL);
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * API returns a value every 10 seconds.
 * Therefore, six entries every minute.
 * Need to take the last six values returned from the API.
 */
const getHealthStatus = (altitudeAvg: number[]): string => {
    const lastSixValues: number[] = [...altitudeAvg.slice(-6)];
    const avgofSixValues = getAvg(lastSixValues);

    if (avgofSixValues < 160) {
        appStateStats.inOrbitalDecayInLastMinute = true;
        return WARNING;
    }
    if (appStateStats.inOrbitalDecayInLastMinute) {
        startSustainedTimer();
        clearSustainedTimer();
        return SUSTAINED;
    }

    // else if ( checkSustainedStatus(lastSixValues)) {
    //     return `Sustained Low Earth Orbit Resumed`;
    // } else if (appStateStats.oneMinutePassed) {
    //     return `Altitude is A-OK`;
    // }
};

// const checkSustainedStatus = (numbers: number[]): boolean => {
//     for (let i = 0; i < numbers.length - 6; i++) {
//         let current = numbers[i];
//         let sixNums = [...numbers.slice(i, i + 6)];
//         let avgOfSix = getAvg(sixNums);
//         if (current <= 160 && Math.max(avgOfSix) <= 160) {
//             return true;
//         }
//     }
//     return false;
// };

const checkOneMinPass = (time: Date): boolean => {
    return true;
};

const checkAvgForLastMinute = () => {};

export const getAvg = (array: number[]): number => {
    let number: number = array.reduce((prev, current) => prev + current, 0);
    let avg: number = number / array.length;
    return avg;
};

export default getHealthStatus;

// Returns average altitude value as a number from an array of numbers.
// export async function getAvg(): Promise<number> {
// 	const altitudeArray = await getAltitude();

// 	if (Array.isArray(altitudeArray) && altitudeArray.length) {
// 		let averageSum = altitudeArray.reduce(
// 			(accum: number, current: number): number => accum + current,
// 			0
// 		);

// 		altitudeAvg = averageSum / altitudeArray.length;
// 		return altitudeAvg;
// 	} else {
// 		throw new Error(`Error! Not an array or array has no values in it.`);
// 	}
// }
