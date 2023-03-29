import {VerifyError} from "./VerifyError.js"

export function VERIFY(assert_result: boolean,assert_message: string) {
	if(!assert_result) {
		throw new VerifyError(assert_message)
	}
}
