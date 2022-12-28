
export type StreamingData={
	adaptiveFormats: {
		itag: number;
		url: string;
	}[];
	expiresInSeconds: `${number}`;
	formats: {
		itag: number;
		url: string;
	}[];
};
