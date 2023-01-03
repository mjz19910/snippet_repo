type WebCommandMetadata={
	webPageType: YtPageTypeEnum;
}|{
	sendPost: boolean;
}|{
	rootVe: number;
}|{
	url: string;
}|DataResponsePageTypeWebMetadata;
type DataResponsePageTypeWebMetadata={
	url: YtUrlFormat;
	webPageType: YtPageTypeEnum;
	rootVe: 3854;
	apiUrl: Join<url_pathname_parts,".">;
};
