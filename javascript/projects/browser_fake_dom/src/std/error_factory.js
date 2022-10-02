import {IllegalConstructorErrorMessage} from "./const.js"
export class error_factory {
	static createIllegalConstructorError() {
		return new TypeError(IllegalConstructorErrorMessage)
	}
}
