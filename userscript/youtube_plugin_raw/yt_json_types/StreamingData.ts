type AdaptiveFormatItem={
	itag: number;
	url: string;
};

type FormatItem={
	itag: number;
	url: string;
};

type StreamingData={
	adaptiveFormats: AdaptiveFormatItem[];
	expiresInSeconds: `${number}`;
	formats: FormatItem[];
};
