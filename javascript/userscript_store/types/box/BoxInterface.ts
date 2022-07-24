import {AnyTypeOfResult} from "./template/BoxTemplate"
export interface BoxInterface {
	type: string
	as_type(x: AnyTypeOfResult): [boolean, this|null]
}
