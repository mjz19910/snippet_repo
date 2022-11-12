export interface BoxVerify<T,N> {
	readonly m_verify_name: N
	verify_name(this: T,name: N): boolean
}
