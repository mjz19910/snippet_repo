import {CastToFunctionIndexOperandValue} from "./values/CastToFunctionIndexOperandValue.js"
import {CastToObjectIndexOperandValue} from "./values/CastToObjectIndexOperandValue.js"
import {CastToVMFunctionOperandValue} from "./values/CastToVMFunctionOperandValue.js"

export type CastOperand1=
	CastToObjectIndexOperandValue|
	CastToFunctionIndexOperandValue|
	CastToVMFunctionOperandValue
