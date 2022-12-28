import {web_cmd_api_url,use_post_req_uniq_symbol} from "./PageTypeShorts";
import {WebCommandMetadata2a} from "./WebCommandMetadata2a";

export type WebCommandMetadata0<T>=WebCommandMetadata2a<T,typeof web_cmd_api_url,typeof use_post_req_uniq_symbol>;
