import {CastToFunctionIndexOperandValue} from "./values/CastToFunctionIndexOperandValue"
import {CastToObjectIndexOperandValue} from "./values/CastToObjectIndexOperandValue"
import {CastToVMFunctionOperandValue} from "./values/CastToVMFunctionOperandValue"

export type CastOperand1=
	CastToObjectIndexOperandValue|
	CastToFunctionIndexOperandValue|
	CastToVMFunctionOperandValue
