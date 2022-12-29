import {SimpleMenuHeaderRendererData} from "./SimpleMenuHeaderRendererData";

export type SimpleMenuHeaderRenderer<HeaderTitle extends string>={
	simpleMenuHeaderRenderer: SimpleMenuHeaderRendererData<HeaderTitle>;
};
