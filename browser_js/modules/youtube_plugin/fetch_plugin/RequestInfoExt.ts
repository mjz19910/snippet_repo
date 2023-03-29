
export type RequestInfoExt={
	response: Response;
	request_info: string|Request|URL;
	init?: RequestInit|undefined;
};
