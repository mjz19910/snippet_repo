import {InstructionType} from "../instruction/InstructionType.js";
import {TreeItem} from "./TreeItem.js";

type StackItemType=['children',number,[number,TreeItem[]]];

export class InstructionAstState {
	clone() {
		return new InstructionAstState([],this.functions_map,[],this.cur_depth);
	}
	constructor(
		public tree: TreeItem[],
		public functions_map: Map<number,InstructionType[]>,
		public stack: StackItemType[]=[],
		public cur_depth=0,
		public items: InstructionType[]=[],
		public depths: number[]=[],
		public ret: InstructionType[]|null=null,
	) {}
}
