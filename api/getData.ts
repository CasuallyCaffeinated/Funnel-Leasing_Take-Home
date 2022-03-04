import fetch from 'node-fetch';
import { Satellite } from './satellite.model';
import { URL } from './api';

export let satelliteData: number[] = [];
export let altitudeAvg: number;

// Fetches data from API
export async function getSatelliteData(): Promise<Satellite> {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		// console.log('DATA: ', data, typeof data);
		return data;
	} catch (error) {
		throw error;
	}
}

// Returns array of altitude values from API
export async function getAltitude(): Promise<number[]> {
	try {
		const apiData = await getSatelliteData();
		// console.log('APIDATA: ', apiData, typeof apiData);
		if (apiData?.altitude) {
			satelliteData.push(apiData?.altitude);
		}
		// console.log('DATA ARRAY', satelliteData, typeof satelliteData);
		altitudeAvg =
			satelliteData.reduce((prev, curr) => prev + curr, 0) /
			satelliteData.length;
		return satelliteData;
	} catch (e) {
		throw e;
	}
}

// Returns average altitude value as a number from an array of numbers.
export async function getAvg(): Promise<number> {
	const altitudeArray = await getAltitude();

	if (Array.isArray(altitudeArray) && altitudeArray.length) {
		let averageSum = altitudeArray.reduce(
			(accum: number, current: number): number => accum + current,
			0
		);
		// console.log('AA', altitudeArray, typeof altitudeArray);
		// console.log('A SUM', averageSum);
		// console.log('AN AVG JOE', averageSum / altitudeArray.length);

		altitudeAvg = averageSum / altitudeArray.length;
		console.log('Altitude Avg', altitudeAvg, typeof altitudeAvg);
		return altitudeAvg;
	} else {
		throw new Error(`Error! Not an array or array has no values in it.`);
	}
}
