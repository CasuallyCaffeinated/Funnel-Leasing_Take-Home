import fetch from 'node-fetch';
import { Satellite } from './satellite.model';
import { URL } from './api';

export let altitudesDataArray: number[] = [];
export let altitudeAvg: number;
export let initialTimestamp: number;
export let currentTimestamp: number;
export let oneMinutePassed: boolean = false;

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
 * Initilizes the Timestamp variables, `initialTimestamp` and `currentTimestamp`.
 * Reduces nums in array, and returns the average.
 * @returns An array of numbers, the altitudes from the API.
 */
export async function getAltitudesArray(): Promise<number[]> {
    try {
        // Await the API object.
        const apiDataObject = await getSatelliteData();

        if (apiDataObject?.altitude) {
            if (altitudesDataArray.length <= 30) {
                altitudesDataArray.push(apiDataObject?.altitude);
            } else if (altitudesDataArray.length > 30) {
                altitudesDataArray.splice(0, 1).push(apiDataObject?.altitude);
            }
        }

        // Get the average value of all the altitudes and keep track of that value
        altitudeAvg =
            altitudesDataArray.reduce((prev, curr) => prev + curr, 0) /
            altitudesDataArray.length;

        return altitudesDataArray;
    } catch (e) {
        throw e;
    }
}

// export async function checkTimeStampDiff(): Promise<boolean> {
//     const getExactlyOneMinute = (await getSatelliteData()).last_updated;

//     // console.log('GIMME TIME', new Date(getExactlyOneMinute).getMinutes());

//     if (!initialTimestamp) {
//         initialTimestamp = new Date(getExactlyOneMinute).getMinutes();
//     }
//     currentTimestamp = new Date(getExactlyOneMinute).getMinutes();

//     // console.log(
//     //     'INIT MINUTE',
//     //     initialTimestamp,
//     //     ' -- ',
//     //     'CURR MINUTE',
//     //     currentTimestamp
//     // );

//     if (currentTimestamp === initialTimestamp + 1) {
//         oneMinutePassed = true;
//         // console.log(
//         //     'INIT MINUTE',
//         //     initialTimestamp,
//         //     ' -- ',
//         //     'CURR MINUTE',
//         //     currentTimestamp,
//         //     ' -- ',
//         //     'Did one minute pass?',
//         //     oneMinutePassed
//         // );
//     } else if (currentTimestamp === initialTimestamp + 2) {
//         // console.log('Did more than one minute pass?', oneMinutePassed);
//         oneMinutePassed = false;
//     }
//     return oneMinutePassed;
// }

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
