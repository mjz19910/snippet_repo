type GenericWebCommandMetadata={
	sendPost: boolean;
	apiUrl: Exclude<`/${ApiUrlFormat}`,SearchApiWebCommandMetadata['apiUrl']|EditPlaylistWebCommandMetadata['apiUrl']>;
};
