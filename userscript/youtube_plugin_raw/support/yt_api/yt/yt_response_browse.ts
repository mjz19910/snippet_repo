import {GeneralContext} from "../../yt_api/_abc/g/GeneralContext.js";
import {BrowseResponse} from "../_abc/b/BrowseResponse.js";


export type yt_response_browse={
	url_type: "browse";
	json: BrowseResponse&{
		responseContext: GeneralContext;
	};
};
