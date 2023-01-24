type D_RichItem=Record<"content",RichItemContent>&{
	trackingParams: string;
	rowIndex?: number;
	colIndex?: number;
};