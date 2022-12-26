declare global {
	interface Buffer {
		utf8Slice(a:number,end:number): string;
	}
}

export {};
