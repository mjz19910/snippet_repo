import {Accessibility} from "../a/Accessibility";

const key_simpleText:unique symbol=Symbol("simpleText");
export type key_simpleText=typeof key_simpleText;

export type SimpleText<_U extends key_simpleText,T extends string>={
	accessibility?: Accessibility;
	simpleText: T;
};
