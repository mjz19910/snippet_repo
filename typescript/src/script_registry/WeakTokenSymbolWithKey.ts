export type WeakTokenSymbolWithKey={
	key: symbol
	weak_ref: WeakRef<Record<"symbol", symbol>>
}
