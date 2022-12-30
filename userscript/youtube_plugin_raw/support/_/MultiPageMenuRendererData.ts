import {MultiPageMenuNotificationSectionRenderer} from "./MultiPageMenuNotificationSectionRenderer";
import {SimpleMenuHeaderRenderer} from "./SimpleMenuHeaderRenderer";

export type MultiPageMenuRendererData={
	header: SimpleMenuHeaderRenderer;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
};
