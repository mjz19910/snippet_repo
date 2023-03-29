import {GenTestCallbackTemplate} from "./tests_mod/GenTestCallbackTemplate.js";

export class TestState<C extends any[],U> {
	items: (() => [string,GenTestCallbackTemplate<C,U>,C?])[]=[];
}
