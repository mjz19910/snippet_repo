import {G_RS_AllResponses} from "../yt_json_types/ghi/group_G.js";

export type FetchJsonParseArgs={
	request: string|URL|Request;
	response: Response;
	parsed_obj: G_RS_AllResponses;
};
