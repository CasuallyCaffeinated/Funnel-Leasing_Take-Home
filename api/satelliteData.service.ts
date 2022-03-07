import fetch from 'node-fetch';
import { startSustainedTimer, clearSustainedTimer } from './timers';
import { getAvgFromArray } from '../utils/avg.util';
import { setStandbyStatus } from '../utils/standbyStatus.util';
import { URL } from './apiUrl';
import { Satellite } from '../types/satellite.type';
import { healthConstants } from '../constants/healthStatuses';
import { SatelliteState } from '../types/satelliteState.type';

export const satelliteState: SatelliteState = {
    altitudeAvg: undefined,
    altitudesDataArray: [],
    inOrbitalDecayInLastMinute: false,
    satelliteHealthStatus: undefined,
    sustainedTimer: undefined,
    sustainedTimerRunning: false,
};

export const initSatelliteDataService = () => {
    setInterval(() => {
        setAltitudesArray();
        setHealthStatus(satelliteState.altitudesDataArray);
    }, 10000);
};

/**
 * Reduces the numbers in array, and assigns the average to `satelliteState.altitudesDataArray`.
 * @returns An array of numbers, the altitudes from the API.
 */
export async function setAltitudesArray(): Promise<void> {
    try {
        // Await the JSON API object.
        const apiDataObject = await getSatelliteData();

        // Check to make sure there is an altitude value.
        if (apiDataObject.altitude) {
            if (satelliteState.altitudesDataArray.length < 30) {
                // if there's <= 5 minutes of data.
                satelliteState.altitudesDataArray.push(apiDataObject.altitude);
            } else if (satelliteState.altitudesDataArray.length >= 30) {
                // if >= 5 minutes of data, remove first element of array, and push the new element.
                satelliteState.altitudesDataArray
                    .splice(0, 1)
                    .push(apiDataObject.altitude);
            }
        }

        // Get the average value of all the altitudes and keep track of that value
        satelliteState.altitudeAvg =
            satelliteState.altitudesDataArray.reduce(
                (prev, current) => prev + current,
                0
            ) / satelliteState.altitudesDataArray.length;
    } catch (e) {
        throw e;
    }
}

export const setHealthStatus = (altitudeAvg: number[]): void => {
    // Destructuring constants
    const { WARNING, SUSTAINED, OK } = healthConstants;

    // If array.length has 6 entries or more, a minute has passed.
    if (altitudeAvg.length >= 6) {
        // Get one minute worth of data
        const lastSixValues: number[] = [...altitudeAvg.slice(-6)];

        const avgofSixValues = getAvgFromArray(lastSixValues);

        if (avgofSixValues < 160) {
            satelliteState.inOrbitalDecayInLastMinute = true;

            if (satelliteState.sustainedTimerRunning) clearSustainedTimer();

            satelliteState.satelliteHealthStatus = WARNING;
            return;
        }

        if (satelliteState.inOrbitalDecayInLastMinute) {
            if (!satelliteState.sustainedTimerRunning) {
                startSustainedTimer();
            }

            satelliteState.satelliteHealthStatus = SUSTAINED;
            return;
        }

        satelliteState.satelliteHealthStatus = OK;
    } else {
        setStandbyStatus(altitudeAvg);
    }
};

/**
 * @returns Fetches data from API, returns JSON response as `<Satellite>`
 */
export async function getSatelliteData(): Promise<Satellite> {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const getHealthStatus = () => {
    return satelliteState.satelliteHealthStatus;
};

export default getHealthStatus;
