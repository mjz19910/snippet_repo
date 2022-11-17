export interface ConstructorWithSymbolType {
	type: symbol;
	new(...args: any[]): any;
};
