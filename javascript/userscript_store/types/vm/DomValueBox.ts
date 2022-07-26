export class DomValueBox {
	type: string
	from: string
	value: any
	constructor(from: string,value: any) {
		this.type='DomValueBox'
		this.from=from
		this.value=value
	}
}
