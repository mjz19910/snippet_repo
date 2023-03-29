import {IParseNodeItems} from "./IParseNodeItems.js"

export class ParseNode {
	data_vec: IParseNodeItems[]
	constructor(...e: IParseNodeItems[]) {
		this.data_vec=e
	}
}
