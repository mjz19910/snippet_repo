import {MultiPageMenuNotificationSectionRenderer} from "./MultiPageMenuNotificationSectionRenderer";
import {SimpleMenuHeaderRenderer} from "./SimpleMenuHeaderRenderer";

export type MultiPageMenuRendererData<HeaderTitle extends string>={
	header: SimpleMenuHeaderRenderer<HeaderTitle>;
	sections: MultiPageMenuNotificationSectionRenderer[];
	trackingParams: string;
};
