export type HeldType={
	type: "held";
	scope: "object"|"script_element";
	storage_id: number;
	id: number;
	key: symbol;
};
