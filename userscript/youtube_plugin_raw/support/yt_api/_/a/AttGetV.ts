import {ResponseContext} from "../g/GeneralContext.js";
import {Att_bgChallenge} from "./Att_bgChallenge";

// spell:disable-next-line
export const att_get_challenge_token_1="kS9PUbzBzfkpnx636le0IQOnLToPkJ8rDwtv7Zd3CH8";

export type AttGetV={
	responseContext: ResponseContext;
	challenge: `a=${number}&a2=${number}&c=${number}&d=${number}&t=${number}&c1a=${number}&hh=${string}`;
	bgChallenge: Att_bgChallenge;
};
