export interface AutoBuyInterface {
	original_map: Map<string,() => void>
	skip_save: boolean
	state_history_clear_for_reset(): void
	destroy(): void
}
