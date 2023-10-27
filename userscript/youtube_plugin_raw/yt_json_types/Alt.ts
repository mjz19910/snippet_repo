// deno-lint-ignore-file
import {RS_Browse} from "./r/group_R.ts";
import {T_Split} from "./stu/group_T.ts";

//#region RS_Browse
export type Alt_RS_Browse_raw=[
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates",
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions",
	"responseContext,contents,trackingParams,topbar,sidebar",
	"responseContext,header,trackingParams,onResponseReceivedActions",
	"responseContext,trackingParams,onResponseReceivedActions",
	"responseContext,contents,header,trackingParams,topbar",
];
export type IncHelper_1<U extends unknown[],T>=T extends 32?never:U['length'] extends T? [unknown,...U]['length']:IncHelper_1<[unknown,...U],T>;
export type Alt_RS_Get<T extends number>=Required<{[U in T_Split<Alt_RS_Browse_raw[T],",">[number]]: U extends keyof RS_Browse? RS_Browse[U]:never;}>;
export type Alt_RS_Browse_Next<T extends number,E extends number>=T extends E?[]:[Alt_RS_Get<T>,...Alt_RS_Browse_Next<IncHelper_1<[],T>,E>];
export type Alt_RS_Browse=Alt_RS_Browse_Next<1,5>[number];
export type Alt_RS_Check={[U in keyof Alt_RS_Browse]: RS_Browse[U]};
//#endregion
