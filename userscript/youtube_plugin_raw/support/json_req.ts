import {AttGetV} from "./AttGetV";
import {GeneralContext} from "./GeneralContext.js";
import {YtApiNext} from "./YtApiNext";
import {YtUrlBase} from "./YtUrlBase";

type U_0={
	url_type: "getDatasyncIdsEndpoint";
	json: {};
};
// import {Decay} from "./yt_api/_exact_data/Decay.js";

// type ExampleChallengeVars=Decay<ParseParamItem<"a=5&a2=10&c=1672168861&d=1&t=7200&c1a=1&hh=AGgPIr3tBg27zD1qUi5VCCBryM_8oaCCrxDEXUyB9Kg">>;
// const u: ExampleChallengeVars={
// 	"a": "5",
// 	"a2": "10",
// 	"c": "1672168861",
// 	"c1a": "1",
// 	"d": "1",
// 	"hh": "AGgPIr3tBg27zD1qUi5VCCBryM_8oaCCrxDEXUyB9Kg",
// 	"t": "7200",
// }; u;

type U_1={
	url_type: "att.get";
	// ['responseContext', 'challenge', 'bgChallenge']
	json: AttGetV;
};

type U_2={
	url_type: "next";
	json: YtApiNext;
};

type U_3={
	url_type: "notification.get_notification_menu";
	json: {};
};

type U_4={
	url_type: "notification.get_unseen_count";
	json: {
		responseContext: GeneralContext;
	};
};

type U_5={
	url_type: "guide";
	json: {};
};

type U_6={
	url_type: "browse";
	json: {};
}

export type json_req=(U_0|U_1|U_2|U_3|U_4|U_5|U_6)&YtUrlBase;
