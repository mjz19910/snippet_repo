import {GeneralContext} from "../_/GeneralContext.js";
import {GuideItemType} from "./GuideItemType";

export type GuideJsonType={
	responseContext: GeneralContext;
	items: GuideItemType[];
	trackingParams: string;
};
