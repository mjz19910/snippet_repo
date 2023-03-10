interface Window {
	debug?: (fn: DebuggableFunctions,code: string) => void|undefined;
	undebug?: (fn: (...x: any[]) => any) => void|undefined;
}
