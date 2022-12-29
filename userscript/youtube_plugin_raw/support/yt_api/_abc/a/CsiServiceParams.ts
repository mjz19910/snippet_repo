import {VerifyHex} from "./VerifyHex";

export type CsiServiceParams={
	service: 'CSI',
	params: [
		{key: 'c',value: 'WEB';},
		{key: 'cver',value: '2.20221220.09.00';},
		{key: 'yt_li',value: '1';},
		{key: 'GetWatchNext_rid',value: VerifyHex<"0xda1e19901199623f">;}
	];
};
