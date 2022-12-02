declare global {
	interface Document {
		stop(): void;
	}

	var arUnit: any[];
	var arrayNames: any[];
	var allspec: any[];
	function calcPres(): number;
	function Find_ToNext(id:number): number;
	function mainCalc(id:number): void;
	function constelOff():void;
}

export interface Holder {}

export {}
