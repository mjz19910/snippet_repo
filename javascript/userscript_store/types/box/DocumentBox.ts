export class DocumentBox {
	type:"document_box"="document_box";
	value:Document;
	as_type(v:'function'|'object'){
		if(v === 'object')return this;
		return null;
	}
	constructor(value: Document){
		this.value=value;
	}
}

