
export type WeakRefTo<T extends {}>={
	key: symbol;
	id: number;
	ref: WeakRef<T>;
};
