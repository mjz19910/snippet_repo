
// reddit_continueThread.js
declare global {
	type getSet=["get_set",PropertyDescriptor];
	type Refs=["refs",string,number];
	type S_or=["or",string,{_bad: true;}];
	type SRefBase=getSet|Refs|S_or;
}
export {};
