export interface BoxInterface {
	type: string
	as_type(input_typeof: string): this|null
}
