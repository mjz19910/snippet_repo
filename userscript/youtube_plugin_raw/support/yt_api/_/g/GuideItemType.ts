import {GuideSectionRenderer} from "./GuideSectionRenderer";
import {GuideSubscriptionsSectionRenderer} from "./GuideSubscriptionsSectionRenderer";

export type GuideItemType=GuideSectionRenderer|GuideSubscriptionsSectionRenderer;
export type GuideItemKeys=keyof GuideSectionRenderer|keyof GuideSubscriptionsSectionRenderer;