import {AttGetV} from "./AttGetV";

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

export type yt_response_att_get={
	url_type: "att.get";
	// ['responseContext', 'challenge', 'bgChallenge']
	json: AttGetV;
};
