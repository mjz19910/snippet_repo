import {ToServiceParamsList} from "../t/ToServiceParamsList";
export type GuidedHelpServiceParams={
	service: 'GUIDED_HELP';
	params: ToServiceParamsList<GuidedHelpState>;
};
type GuidedHelpState={
	logged_in: '0'|'1';
	context: "yt_web_unknown_form_factor_kevlar_w2w";
};
