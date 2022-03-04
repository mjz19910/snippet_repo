export class DocumentBox {
	type:"document_box"="document_box";
	value:Document;
	as_type(v:'function'|'object'){
		if(v === 'object')return this;
		return null;
	}
	verify_name(name:"DocumentBox"){
		if(name !== 'DocumentBox'){
			throw new Error("bad box");
		}
	}
	constructor(value: Document){
		this.value=value;
	}
}

