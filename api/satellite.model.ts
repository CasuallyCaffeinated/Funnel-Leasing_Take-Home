export interface Satellite {
	altitude?: number | undefined;
	last_updated?: string | undefined;
}

export interface Satellite extends Array<Satellite> {}
