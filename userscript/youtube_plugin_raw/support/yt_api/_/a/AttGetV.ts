import {GeneralContext} from "../../_abc/g/GeneralContext.js";
import {Att_bgChallenge} from "./Att_bgChallenge";

export type AttGetV={
	responseContext: GeneralContext;
	challenge: string;
	bgChallenge: Att_bgChallenge;
};
