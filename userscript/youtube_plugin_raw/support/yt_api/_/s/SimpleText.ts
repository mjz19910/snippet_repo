import {Accessibility} from "../../_/a/Accessibility";

const key_simpleText:unique symbol=Symbol("simpleText");
export type key_simpleText=typeof key_simpleText;

export type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};

export type SimpleTextFixmeValueNeeded={
	simpleText: string;
};
