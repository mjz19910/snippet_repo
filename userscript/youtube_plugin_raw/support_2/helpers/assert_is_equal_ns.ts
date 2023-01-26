namespace A {
	export type assert_is_equal_ns<T,U>=T extends U? U extends T? U:never:never;
}