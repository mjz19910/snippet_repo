import {VerifyHex} from "./VerifyHex";

type CsiVarMap={
	c: {key: 'c',value: 'WEB';};
	cver: {key: 'cver',value: '2.20221220.09.00';};
	yt_li: {key: 'yt_li',value: '1';};
	GetWatchNext_rid: {key: 'GetWatchNext_rid',value: VerifyHex<"0xda1e19901199623f">;};
	GetAttestationChallenge_rid: {key: "GetAttestationChallenge_rid",value: VerifyHex<"0x841ae46b5aadd14c">;};
};

export type CsiServiceParams={
	service: 'CSI',
	params: CsiVarMap[keyof CsiVarMap][];
};
