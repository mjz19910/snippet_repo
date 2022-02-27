export class List {
	constructor(...e) {
		if(e[0] instanceof Array && e.length == 1) {
			this.data = e[0];
		} else {
			this.data = e;
		}
	}
}
