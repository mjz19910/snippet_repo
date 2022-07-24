export interface MarkerHandler {
	print_marker(first: boolean, successful: number, finished: number, total: number): void
}
