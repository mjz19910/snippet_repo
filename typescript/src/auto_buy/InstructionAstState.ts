import {InstructionType} from "../vm/instruction/InstructionType.js";
import {TreeItem} from "../vm/TreeItem.js";

type StackItemType=['children',number,[number,TreeItem[]]];

export class InstructionAstState {
	clone() {
		return new InstructionAstState(this.tree,this.functions_map,this.stack,this.cur_depth);
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
