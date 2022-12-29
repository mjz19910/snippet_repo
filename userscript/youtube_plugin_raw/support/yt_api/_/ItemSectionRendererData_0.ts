import {WebCommandMetadata0} from "../../_/w/WebCommandMetadata0";

export type ItemSectionRendererData_0={
	contents: {
		continuationItemRenderer: {
			continuationEndpoint: {
				clickTrackingParams: string;
				commandMetadata: {
					webCommandMetadata: WebCommandMetadata0<"/youtubei/v1/browse">;
				};
				continuationCommand: {
					request: "CONTINUATION_REQUEST_TYPE_BROWSE";
					token: string;
				};
			};
			trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
		};
	}[];
	sectionIdentifier: "comment-item-section";
	targetId: "engagement-panel-comments-section";
	trackingParams: string;
};
