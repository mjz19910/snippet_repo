type D_CommandRunItem={
	startIndex: number;
	length: number;
	onTap: C_Innertube;
	loggingDirectives?: D_LoggingDirectives;
};
type D_StyleRunItem=({
	fontColor: number;
	fontName: string;
	weight: number;
}|{
	styleRunExtensions: {
		styleRunColorMapExtension: {
			colorMap: [
				{key: "USER_INTERFACE_THEME_DARK",value: 0xffffffff;},
				{key: "USER_INTERFACE_THEME_LIGHT",value: 0xff131313;}
			];
		};
	};
})&{
	startIndex: number;
	length: number;
};
type D_AttributedDescription={
	content: string;
	commandRuns?: D_CommandRunItem[];
	styleRuns?: D_StyleRunItem[];
	attachmentRuns?: R_AttachmentElement[];
	decorationRuns?: R_TextDecorator[];
};
