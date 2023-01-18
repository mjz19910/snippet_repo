type LoggingDirectives={
	trackingParams: string;
	visibility: Visibility;
	enableDisplayloggerExperiment?: boolean;
	gestures: TypesTemplate<4>;
};
type TypesTemplate<T extends number>={types:`${T}`};