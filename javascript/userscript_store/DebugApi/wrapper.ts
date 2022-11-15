// 'Workaround' for achieving compile-time type inference with a constructor
interface WrapperConstructor {
    new<TR>(wrapped: () => TR): NullaryWrapper<TR>;
    new<TR, T0>(wrapped: ($0: T0) => TR): UnaryWrapper<TR, T0>;
    new<TR, T0, T1>(wrapped: ($0: T0, $1: T1) => TR): BinaryWrapper<TR, T0, T1>;
}
interface Wrapper                                   {   invoke(...args: any[]): any;}
interface NullaryWrapper<TR> extends Wrapper        {   invoke(): TR;               }
interface UnaryWrapper<TR, T0> extends Wrapper      {   invoke($0: T0): TR;         }
interface BinaryWrapper<TR, T0, T1> extends Wrapper {   invoke($0: T0, $1: T1): TR; }

let Wrapper: WrapperConstructor = class {
    constructor(private wrapped: Function) { }
    invoke(...args: any[]) {
        let result = this.wrapped(...args);
        console.log(`WRAPPED RESULT: ${result}`);
        return result;
    }
};
