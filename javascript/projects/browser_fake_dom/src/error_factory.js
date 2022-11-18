import {IllegalConstructorErrorMessage} from "./const.js"
export class ErrorFactory {
	static createIllegalConstructorError() {
		return new TypeError(IllegalConstructorErrorMessage)
	}
}
