import {R_TwoColumnBrowseResults} from "../r/group_R.ts";

export type Ret_json_auto_raw=
	|"prefetchHintConfig"
	|"openPopupAction"
	|"metadataBadgeRenderer"
	|keyof R_TwoColumnBrowseResults
	|"browseEndpoint"
	|"innertubeCommand"
	|"reelItemRenderer";
