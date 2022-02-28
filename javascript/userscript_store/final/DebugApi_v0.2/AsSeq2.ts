import {IntInc} from "types/Tools";
import {AsSeqImpl} from "./AsSeqImpl";
type SeqCarLast<T, X extends number>=[SeqCar<T, X>];
type SeqCdr<T, X extends number>= AsSeq2<T, IntInc<X>>;
type SeqCar<T, X extends number> = AsSeqImpl<T, X>[0];

type Seq1<T, X extends number> = [
	SeqCar<T, X>,
	...SeqCdr<T, X>
];

export type AsSeq2<T, X extends number> =
	X extends 0 ?
	Seq1<T, X> :
	SeqCar<T, X> extends undefined ?
	never :
	SeqCdr<T, X> extends undefined ?
	SeqCarLast<T, X> :
	Seq1<T, X>;
