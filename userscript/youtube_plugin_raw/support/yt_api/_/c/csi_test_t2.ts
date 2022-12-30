import {VerifyHex} from "./VerifyHex";
import {CsiGetWatchNext_rid} from "./CsiGetWatchNext_rid";

export function csi_test_t2() {
	type IsValidT=VerifyHex<CsiGetWatchNext_rid["value"]>;
	const vv: IsValidT="0xda1e19901199623f"; vv;
}
