import {MultiPageMenuNotificationSectionRenderer} from "../support/yt_api/_/m/MultiPageMenuNotificationSectionRenderer";
import {SimpleMenuHeaderRenderer} from "./SimpleMenuHeaderRenderer";

export type MultiPageMenuRendererData={
	header: SimpleMenuHeaderRenderer;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
	style?: {};
};