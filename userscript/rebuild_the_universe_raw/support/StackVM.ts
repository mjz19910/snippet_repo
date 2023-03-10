import {Box} from "./box/Box";

export class StackVM {
	stack:Box[]=[];
	push(value:Box) {this.stack.push(value);}
}
