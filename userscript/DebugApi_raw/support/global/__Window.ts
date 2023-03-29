interface Window {
	debug?: (fn: FunctionLike,code: string) => void|undefined;
	undebug?: (fn: (...x: any[]) => any) => void|undefined;
}
