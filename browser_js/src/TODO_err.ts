import captureStackTrace from "./capture-stack-trace.js";

export function TODO_err(): Error {
	let err=new Error("TODO");
	captureStackTrace(err);
	return err;
}
