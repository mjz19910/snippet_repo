export function TODO_err(): Error {
	let err=new Error("TODO")
	Error.captureStackTrace(err,TODO_err)
	return err
}
