import {DefaultButtonRenderer} from "./DefaultButtonRenderer";
import {SimpleTextOnly} from "./SimpleTextOnly";


export type SimpleMenuHeaderRendererData<HeaderTitle extends string>={
	title: SimpleTextOnly<HeaderTitle>;
	buttons: DefaultButtonRenderer[];
};
