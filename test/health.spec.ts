import { expect } from 'chai';
import { setHealthStatus } from '../api/satelliteData.service';
import { satelliteState } from '../api/satelliteData.service';
import getAvgFromArray from '../utils/avg.util';

const ALTITUDE_OK_ARRAY = [161, 161, 161, 162, 165, 175, 176];
const WARNING_MSG_ARRAY = [150, 151, 152, 153, 154, 155];
const SUSTAINED_MSG_ARRAY = [150, 152, 162, 160, 163, 190];
const AVG_ARRAY = [1, 2, 3, 4, 5];

describe('Index Test', () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });
});

describe('#getAvgFromArray()', () => {
    it('given an array of nums, when calling getAvgFromArray(), then return avg of all nums in array', () => {
        const avgNumber: number = 3;

        const avgCheck = getAvgFromArray(AVG_ARRAY);
        expect(avgCheck).to.equal(avgNumber);
    });
});

describe('#setHealthStatus()', () => {
    let flag = true;

    it('given an array of nums, when calling setHealthStatus(), \nthen return a warning message whenever the average altitude over the last minute < 160', () => {
        const warningMsg: string = `WARNING: RAPID ORBITAL DECAY IMMINENT`;
        // Function called:
        if (flag) {
            setHealthStatus(WARNING_MSG_ARRAY);
            expect(satelliteState.satelliteHealthStatus).to.equal(warningMsg);
        }
    });

    it('given an array whose average value over the last minute > 160, when calling setHealthStatus(),\nthen return a sustained response when the sustained case is not hit', () => {
        before(() => {
            satelliteState.inOrbitalDecayInLastMinute = true;
        });

        const altitudeStringSustained: string = `Sustained Low Earth Orbit Resumed`;

        // Function called:
        if (flag) {
            setHealthStatus(SUSTAINED_MSG_ARRAY);
            expect(satelliteState.satelliteHealthStatus).to.equal(
                altitudeStringSustained
            );
        }
    });
    it('given an array of nums whose avarage > 160, when calling setHealthStatus(),\nthen return a positive response when the sustained case is hit', () => {
        const altitudeStringOK: string = `Altitude is A-OK`;

        before(() => {
            flag = false;
        });

        // Function called:
        if (!flag) {
            setHealthStatus(ALTITUDE_OK_ARRAY);
            expect(satelliteState.satelliteHealthStatus).to.equal(
                altitudeStringOK
            );
        }
    });
});
