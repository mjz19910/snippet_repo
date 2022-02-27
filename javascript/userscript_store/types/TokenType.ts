import {TokenPtr} from "./TokenPtr";

export type TokenType = {
	key: symbol;
	ref: WeakRef<TokenPtr>;
};
