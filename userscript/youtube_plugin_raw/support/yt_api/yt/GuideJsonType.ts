import {ResponseContext} from "../_/g/GeneralContext.js";
import {GuideItemType} from "./GuideItemType";

export type GuideJsonType={
	responseContext: ResponseContext;
	items: GuideItemType[];
	trackingParams: string;
};
