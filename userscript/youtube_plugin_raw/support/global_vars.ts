export type GlobalAttach=1;

declare global {
	var require: ((x:string)=>any)|undefined;
}
