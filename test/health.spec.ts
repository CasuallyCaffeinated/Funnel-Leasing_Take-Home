import { expect } from 'chai';
import healthStatus from '../utils/healthCheck';
import { checkForAvg } from '../utils/healthCheck';

const ALTITUDE_OK_ARRAY = [161, 161, 161, 162, 165, 175, 176];
const WARNING_MSG_ARRAY = [150, 151, 152, 153, 154, 155];
const SUSTAINED_MSG_ARRAY = [150, 152, 162, 160, 163, 190];
const AVG_ARRAY = [1, 2, 3, 4, 5];

describe('Index Test', () => {
	it('should always pass', () => {
		expect(true).to.equal(true);
	});
});

describe('#checkForAvg()', () => {
	it('given an array of nums, when calling checkForAvg(), then return avg of all nums in array', () => {
		const avgNumber: number = 3;

		const avgCheck = checkForAvg(AVG_ARRAY);
		expect(avgCheck).to.equal(avgNumber);
	});
});

xdescribe('#checkSustainedStatus()', () => {
	it('given', () => {});
});

describe('#healthStatus()', () => {
	let flag = true;

	it('given an array of nums, when calling healthStatus(), \nthen return a warning message whenever the average altitude over the last minute < 160', () => {
		const warningMsg: string = `WARNING: RAPID ORBITAL DECAY IMMINENT`;
		// Function called:
		if (flag) {
			const healthCheck = healthStatus(WARNING_MSG_ARRAY);
			expect(healthCheck).to.equal(warningMsg);
		}
	});

	it('given an array of nums which values > 160, when calling healthStatus(),\nthen return an positive response when the sustained case is not hit', () => {
		const altitudeStringSustained: string = `Sustained Low Earth Orbit Resumed`;

		// Function called:
		if (flag) {
			const healthCheckV2 = healthStatus(SUSTAINED_MSG_ARRAY);
			expect(healthCheckV2).to.equal(altitudeStringSustained);
		}
	});
	it('given an array of nums whose avarage > 160, when calling healthStatus(),\nthen return a sustained response when the sustained case is hit', () => {
		const altitudeStringOK: string = `Altitude is A-OK`;

		before(() => {
			flag = false;
		});

		// Function called:
		if (!flag) {
			const healthCheckV2 = healthStatus(ALTITUDE_OK_ARRAY);
			expect(healthCheckV2).to.equal(altitudeStringOK);
		}
	});
});
