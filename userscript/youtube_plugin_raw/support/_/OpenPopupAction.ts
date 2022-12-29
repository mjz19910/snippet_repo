import {MultiPageMenuRenderer} from "./MultiPageMenuRenderer";

export type OpenPopupAction<HeaderTitle extends string>={
	popup: MultiPageMenuRenderer<HeaderTitle>;
	popupType: "DROPDOWN";
};
