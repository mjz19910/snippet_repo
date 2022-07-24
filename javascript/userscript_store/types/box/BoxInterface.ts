import {AnyTypeOfResult} from "./BoxTemplate"
export interface BoxInterface {
	type: string
	as_type(x: AnyTypeOfResult): this|null
}
