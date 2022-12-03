export {};

declare global {
	interface Window {
		CustomInputMatcher: {};
		debug?:debug;
		undebug?:undebug;
	}

	type SymbolIndexable={
		[x: symbol]: any;
	}

	interface undebug {
		(fn: ()=>void): void;
	}
	var undebug: undebug;

	interface debug {
		(fn:()=>void, code:string): void;
		fn: () => void;
		get_from: any;
		g: any;
	}
	var debug: debug;

	var game_objects: {
		['creature.Hero']: any;
		Player: {instance: {game: {update: any;};};};
	};

	var out: {[x: string]: Function;};

	var _player: {instance: {game: {update: any;};};};

	var game: {dungeonHeroes?: any; addHero?: any; scrollDungeonHeroTo?: any; update?: any;};
}
namespace X {
	export class CustomInputMatcher {
		test_string: string|RegExp;
		test_needle: string|RegExp;
		ts_get: unknown;
		constructor(test_string: string|RegExp,string_getter: unknown) {
			this.test_string=test_string;
			this.test_needle="";
			this.ts_get=string_getter;
		}
	}
}
