export type WeakRefWithKey={
	key: symbol
	weak_ref: WeakRef<Record<"symbol", symbol>>
}
