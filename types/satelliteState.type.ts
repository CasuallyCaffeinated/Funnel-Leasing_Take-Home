export type SatelliteState = {
    altitudesDataArray: number[];
    altitudeAvg: undefined | number;
    inOrbitalDecayInLastMinute: undefined | boolean;
    satelliteHealthStatus: undefined | string;
    sustainedTimerRunning: undefined | boolean;
    sustainedTimer: undefined | NodeJS.Timeout;
};
