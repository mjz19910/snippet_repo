import {BrowseEndpointData} from "../b/BrowseEndpointData.js";
import {ToServiceParamsList} from "../t/ToServiceParamsList.js";

export type GFeedbackServiceParams={
	service: 'GFEEDBACK';
	params: ToServiceParamsList<GFeedbackVarMap>
};
type GFeedbackVarMap={
	e: string;
	logged_in: "0"|"1";
	premium_membership: "non_member";
	has_unlimited_entitlement: "False";
	has_alc_entitlement: "false";
	is_alc_surface: "false";
	ipcc: "0";
	is_viewed_live: "false";
	browse_id: BrowseEndpointData['browseId'];
};
