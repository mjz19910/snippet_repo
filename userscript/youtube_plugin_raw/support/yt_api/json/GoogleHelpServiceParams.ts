import {GoogleHelpServiceObj} from "./GoogleHelpServiceObj";
import {ToServiceParamsList} from "./ToServiceParamsList.js";

export type GoogleHelpServiceParams={
	service: "GOOGLE_HELP";
	params: ToServiceParamsList<GoogleHelpServiceObj>;
};
