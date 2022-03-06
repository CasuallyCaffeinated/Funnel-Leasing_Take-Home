import { satelliteState } from './satelliteData.service';

export const startSustainedTimer = () => {
    satelliteState.sustainedTimerRunning = true;
    const timer = setTimeout(() => {
        satelliteState.inOrbitalDecayInLastMinute = false;
        satelliteState.sustainedTimerRunning = false;
    }, 60000);

    satelliteState.sustainedTimer = timer;
};

export const clearSustainedTimer = () => {
    satelliteState.sustainedTimerRunning = false;
    clearTimeout(satelliteState.sustainedTimer);
};
