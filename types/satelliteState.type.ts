export type SatelliteState = {
    altitudeAvg: undefined | number;
    altitudesDataArray: number[];
    inOrbitalDecayInLastMinute: undefined | boolean;
    satelliteHealthStatus: undefined | string;
    sustainedTimer: undefined | NodeJS.Timeout;
    sustainedTimerRunning: undefined | boolean;
};
