import {BoxTemplate} from "./template/BoxTemplate.ts";

export interface BoxMaker<TMakerArgs,TBoxRet extends BoxTemplate<string,any>> {
	maker: (
		make_new: (do_box: () => TBoxRet['value'],...a: TMakerArgs[]) => TBoxRet,
		value: FunctionConstructor
	) => TBoxRet;
}
