import {D_UrlFormat} from "../d/group_D/D.js";

export type B_GenericResponseType={
	type: "_Generic";
	data: {};
};
export type B_Hack={hack: true;};
export type B_HrefUrl={hrefUrl: D_UrlFormat;};
export type B_StateTag={
	stateTag: 3;
	instruction: "STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY";
}|{
	stateTag: 3;
	onStateTagModified: "STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE";
};
export type B_TagObj<T>={tag: T;};
export type B_VEMap={
	3832: {CommandMetadata: M_VE3832;};
	3611: {CommandMetadata: M_VE3611;};
	3854: {CommandMetadata: M_VE3854;};
	4724: {CommandMetadata: M_Search;};
	5754: {CommandMetadata: M_VE5754;};
	6827: {CommandMetadata: M_VE6827;};
	11487: {CommandMetadata: M_VE11487;};
	23462: {CommandMetadata: M_VE23462;};
	37414: {CommandMetadata: M_VE37414;};
	83769: {CommandMetadata: M_Url;};
	96368: {CommandMetadata: M_VE96368;};
};