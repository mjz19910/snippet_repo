
declare global {
	type None={type: "n";};
	type Some<T>={
		type: "s";
		v: T;
	};
}
export {};
