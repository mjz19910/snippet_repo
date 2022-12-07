export type HeldType={
	type: "held";
	scope: "object"|"script_element";
	store_id: number;
	id: number;
	key: symbol;
};
