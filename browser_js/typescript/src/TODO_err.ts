<<<<<<< HEAD
import captureStackTrace from "./capture-stack-trace.js";

export function TODO_err(): Error {
	let err=new Error("TODO");
	captureStackTrace(err);
	return err;
=======
export function TODO_err(): Error {
	let err=new Error("TODO")
	Error.captureStackTrace(err,TODO_err)
	return err
>>>>>>> e10fb913 (u)
}
