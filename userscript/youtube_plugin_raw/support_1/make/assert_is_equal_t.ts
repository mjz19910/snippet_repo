export function assert_is_equal_t<T>(_x: T,_v: T) {}
export function assert_is_equal<T extends string,U extends string|T=(string|T)>(_x: U) {}
