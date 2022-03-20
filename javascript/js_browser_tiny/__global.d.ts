interface Window {
	setup_accessor?:(v:any)=>number;
}
interface Console {}
declare namespace global {
	var global: typeof globalThis;
	var console:Console;
}
