type D_CommandRunItem={
	startIndex: number;
	length: number;
	onTap: C_Innertube;
	loggingDirectives?: D_LoggingDirectives;
};
type D_StyleRunItem={
	startIndex: number;
	length: number;
	fontColor: number;
	fontName?: string;
	weight?: number;
};
type D_AttributedDescription={
	content: string;
	commandRuns: D_CommandRunItem[];
	styleRuns: D_StyleRunItem[];
	attachmentRuns?: R_AttachmentElement[];
	decorationRuns?: R_TextDecorator[];
};
