import {ResponseContext} from "../g/GeneralContext.js";
import {Att_bgChallenge} from "./Att_bgChallenge";

export type AttGetV={
	responseContext: ResponseContext;
	challenge: string;
	bgChallenge: Att_bgChallenge;
};
