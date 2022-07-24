
// SelectCovariant causes a union type to be inferred.
type SelectCoVariant<T>=T extends (infer U)[]? U:T extends (...args: any[]) => infer U? U:T

type SelectContraVariant<T>=T extends [(x: infer U) => 0,(x: infer U) => 0]? U:never

type AnyFunction=(...args: any[]) => any
/*
This is part of the lib
type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any
type Required<T> = { [P in keyof T]-?: T[P] }

Exclude<T, U>
Extract<T, U>
NonNullable<T>
ReturnType<T>
InstanceType<T>
*/
type NoReadonly<T>={-readonly [P in keyof T]: T[P]}
type NoOptional<T>={[P in keyof T]-?: T[P]}
type MutableRequired_T<T>=NoOptional<T>&NoReadonly<T>
type MutableRequired<T>={-readonly [P in keyof T]-?: T[P]}
/*
type A = { a: string }
type B = { b: string }
type T1 = keyof (A & B) // "a" | "b"
type T2<T> = keyof (T & B) // keyof T | "b"
type T3<U> = keyof (A & U) // "a" | keyof U
type T4<T, U> = keyof (T & U) // keyof T | keyof U
type T5 = T2<A> // "a" | "b"
type T6 = T3<B> // "a" | "b"
type T7 = T4<A, B> // "a" | "b"
 */
/*
// at top level
var ns = {} // recognized as a declaration for a namespace `ns`
ns.constant = 1 // recognized as a declaration for var `constant`
*/

declare function bind<T,U extends any[],V>(): (x: T,...args: U) => V
declare function f3(x: number,y: string,z: boolean): void
type T1=typeof bind
type T2=T1

