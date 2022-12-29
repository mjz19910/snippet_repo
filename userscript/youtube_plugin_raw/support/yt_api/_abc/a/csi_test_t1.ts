import {Split} from "../../../make/Split.js";
import {HexByte} from "./HexByte";
import {HexNib} from "./HexNib";

export function csi_test_t1() {
	type U0=HexNib<"d">;
	type U1=`${HexNib<"d">}${HexNib<"a">}`;
	type Cx=HexByte<"da">;
	const u: Cx&U1="da"; u;
	const [x]: Split<U1,"">=[...u] as Split<U1,"">;
	const A: U0=x; A;
	u;
}
