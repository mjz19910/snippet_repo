export class CompressedArray extends Array<string>{}
export class UncompressedArray extends Array<string>{}
export class AutoBuyState {
	debug: boolean
	arr: number[]
	ratio: number
	constructor()
	init(): void
}
export class AutoBuy {
	delay: number
	state: AutoBuyState
	state_history_arr: string[]|CompressedArray
	constructor()
}
export class SpecType {
	name: 'Breit-Wheeler process'
	desc: 'Convert pure light to matter.'
	done: false|true
	cost: 100000
}

declare global {
	export interface Window {
		atomepersecond: number
		//spell:words totalAtome
		totalAtome: number
		prestige: number
		g_auto_buy: AutoBuy
		__testing__: false
		bonusAll(): void
		allspec: SpecType[]
		specialclick(index: number): void
		//spell:words lightreset
		lightreset(): void
		timeplayed: number
		//spell:words totalAchi
		totalAchi(): number
		//spell:words _targets_achi
		_targets_achi: any[]
		arUnit: any[]
		Get_Unit_Type(v: any): any
		getUnitPromoCost(v: any): number
		Find_ToNext(v: number): number
		_targets: any[]
		mainCalc(v: any): void
		tonext(v: number): void
		//spell:disable-next-line
		specialsbought: number
		doc: Document
		rounding(v: number,x: any,y: any): string
		/*spell:disable-next-line*/
		atomsinvest: number
		calcDiff(v: number): number
		/*spell:disable-next-line*/
		noti: boolean
		gritter: any
		toTitleCase(v: string): string
		cint_arr: (string|number[])[]
		/*spell:disable-next-line*/
		adsbygoogle: {
			op: any,
			push(v: number): void
		}
		/*spell:disable-next-line*/
		plurials(v: string): string
		arrayNames: string[]
		/*spell:disable-next-line*/
		updateprogress(v: any): void
		$: (val: any) => any
		seeUnit(v: number): any
		/*spell:disable-next-line*/
		checkspec(): void
		/*spell:disable-next-line*/
		achiSpec(): void
		Pace: {
			bar: {
				progress: number,
				finish: Function
			}
		}
		_SM_Data: any
		on_on_timers_moved_first: boolean
	}
	export var Window: {
		prototype: Window
		new(): Window
	}
	interface CSSStyleSheet {
		replace(x: string): Promise<CSSStyleSheet>
	}
	interface HTMLDivElement {
		style: CSSStyleDeclaration
	}
	interface Document {
		adoptedStyleSheets: CSSStyleSheet[]

		// don't make an error, just do nothing
		stop(): void
	}
}
