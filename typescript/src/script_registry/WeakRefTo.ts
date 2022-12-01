export type WeakRefTo<T extends {}>={
	key: symbol;
	storage_id: number;
	id: number;
	ref: WeakRef<T>;
};
