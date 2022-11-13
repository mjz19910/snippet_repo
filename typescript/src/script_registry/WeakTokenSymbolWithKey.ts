export type WeakTokenSymbolWithKey={
	key: symbol
	weak_ptr: WeakRef<Record<"symbol", symbol>>
}
