import {FunctionLike} from "../types/FunctionLike.ts";

export type EventListenerInternal={
	listener: FunctionLike;
	once: boolean;
	passive: boolean;
	type: "string";
	useCapture: boolean;
};
