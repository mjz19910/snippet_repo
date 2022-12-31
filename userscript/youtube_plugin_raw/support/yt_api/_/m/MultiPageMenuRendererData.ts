import {MultiPageMenuNotificationSectionRenderer} from "./MultiPageMenuNotificationSectionRenderer";
import {SimpleMenuHeaderRenderer} from "../s/SimpleMenuHeaderRenderer";

export type MultiPageMenuRendererData={
	header: SimpleMenuHeaderRenderer;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
	style?: {};
};