import {GeneralContext} from "../_/g/GeneralContext.js";
import {GuideItemType} from "./GuideItemType";

export type GuideJsonType={
	responseContext: GeneralContext;
	items: GuideItemType[];
	trackingParams: string;
};
