import {GuideItemType} from "./GuideItemType.js";

export type GuideJsonType={
	responseContext: ResponseContext;
	items: GuideItemType[];
	trackingParams: string;
};
