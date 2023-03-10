import {Box} from "./box/z_done/box/Box";

export class StackVM {
	stack:Box[]=[];
	push(value:Box) {this.stack.push(value);}
}
