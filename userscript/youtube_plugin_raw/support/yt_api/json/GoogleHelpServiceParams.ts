import {GoogleHelpServiceObj} from "./GoogleHelpServiceObj";
import {ToServiceParams} from "./ToServiceParams.js";

export type GoogleHelpServiceParams={
	service: "GOOGLE_HELP";
	params: ToServiceParams<GoogleHelpServiceObj>;
};
