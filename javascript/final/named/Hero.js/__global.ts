export {};

declare global {
	interface Window {
		undebug?: undebug;
		func_want: {};
	}

	type SymbolIndexable={
		[x: symbol]: any;
	};

	interface undebug {
		(fn: () => void): void;
	}

	var game_objects: {
		['creature.Hero']: any;
		Player: {instance: {game: {update: any;};};};
	};

	var out: {[x: string]: Function;};

	var _player: {instance: {game: {update: any;};};};
}
