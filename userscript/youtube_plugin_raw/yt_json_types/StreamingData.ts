type AdaptiveFormatItem={
	itag: number;
	url: string;
};

type FormatItem={
	itag: number;
	url: string;
};

type StreamingData={
	expiresInSeconds: `${number}`;
	adaptiveFormats: AdaptiveFormatItem[];
	formats: FormatItem[];
};
