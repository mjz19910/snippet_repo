
export function make_never(): never {
	throw new Error("Not to be used, just makes a never type we can use to verify equality");
}
