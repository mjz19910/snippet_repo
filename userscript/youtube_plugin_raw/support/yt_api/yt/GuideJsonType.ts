import {GeneralContext} from "../../yt_api/_abc/g/GeneralContext.js";
import {GuideItemType} from "./GuideItemType";

export type GuideJsonType={
	responseContext: GeneralContext;
	items: GuideItemType[];
	trackingParams: string;
};
