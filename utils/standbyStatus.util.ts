import getAvgOfArray from './avg.util';
import { healthConstants } from '../constants/healthStatuses';
import { satelliteState } from '../api/satelliteData.service';

export const setStandbyStatus = (altitudesArray: number[]): void => {
    const { WARNING, OK, STANDBY } = healthConstants;

    const altitudeArrayValues: number[] = altitudesArray.slice();

    if (
        altitudeArrayValues.length > 0 &&
        getAvgOfArray(altitudeArrayValues) >= 160
    ) {
        satelliteState.satelliteHealthStatus = OK;
    } else if (
        altitudeArrayValues.length > 0 &&
        getAvgOfArray(altitudeArrayValues) < 160
    ) {
        satelliteState.satelliteHealthStatus = WARNING;
    } else {
        satelliteState.satelliteHealthStatus = STANDBY;
    }
};
