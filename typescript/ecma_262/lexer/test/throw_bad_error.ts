
export function throw_bad_error(value: any): never {
	console.log(value);
	throw new Error("Bad");
}
