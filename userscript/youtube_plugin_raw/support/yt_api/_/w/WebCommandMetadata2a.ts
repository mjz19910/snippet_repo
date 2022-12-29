import {web_cmd_api_url,use_post_req_uniq_symbol} from "../../_abc/p/PageTypeShorts";


export type WebCommandMetadata2a<T,_z extends typeof web_cmd_api_url,_U extends typeof use_post_req_uniq_symbol>={
	apiUrl: T;
	sendPost: true;
};
