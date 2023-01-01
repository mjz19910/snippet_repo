import {Split} from "../../json/Split.js";
import {NumArrStr} from "../n/NumArrStr.js";
import {NumArrStrVerify} from "../n/NumArrStrVerify.js";

export function verify_service_g_feedback_valid() {
	const ss="1714247,9405964,23804281,23882502,23918597,23934970,23946420,23966208,23983296,23986033,23998056,24001373,24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738,24108447,24120820,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24170049,24181174,24187043,24187377,24197450,24211178,24217535,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24290971,24291857,24292955,24390675,24396645,24402891,24404640,24406313,24406621,24414718,24415864,24415866,24416290,24421159,24429095,24433679,24436009,24437562,24437575,24439482,24441244,24443373,24590921,24591046,39322504,39322574";
	type TS=typeof ss;
	type Ux=NumArrStrVerify<TS>;
	type TV=Split<Ux,",">;
	type PNum<T extends string>=T extends `${infer U extends number}`? U:never;
	type TVM=PNum<TV[0]>;
	type TR=NumArrStr<TS>;
	type FmtCon<T extends string,J extends string>=J extends ""? `${T}`:`${T},${J}`;
	type Fmt<T>=T extends any[]? T extends [infer U1 extends number,infer U2 extends number,infer U3 extends number,...infer J]? FmtCon<`${U1},${U2},${U3}`,Fmt<J>>:T extends [infer U1 extends number,infer U2 extends number,...infer J]? FmtCon<`${U1},${U2}`,Fmt<J>>:T extends [infer U extends number]? `${U}`:"":"";
	/** @template {string} T @returns {T extends `${infer Z extends number}` ? Z : never} */
	function to_number<U extends string,T extends U extends `${infer Z extends number}`? Z:never>(x: U): T {
		return Number(x) as T;
	}
	const vq=ss.split(",") as TV;
	const q: TVM=to_number(vq[0]); q;
	const va=vq.map(e => to_number(e)) as TR; va;
	type FX=Fmt<TR>;
	const rr: FX=ss; rr;
}
