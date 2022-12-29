import {MultiPageMenuRendererData} from "./MultiPageMenuRendererData";

export type MultiPageMenuRenderer<HeaderTitle extends string>={
	multiPageMenuRenderer: MultiPageMenuRendererData<HeaderTitle>;
};
