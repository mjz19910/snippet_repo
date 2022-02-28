import {IntInc} from "types/Tools";
import {AsSeqImpl} from "./DebugAPI_convert_1";

export type AsSeq2<T, X extends number> = X extends 0 ? [AsSeqImpl<T, 0>[0], ...AsSeq2<T, IntInc<X>>] : AsSeqImpl<T, X>[0] extends undefined ? never : AsSeq2<T, IntInc<X>> extends undefined ? [AsSeqImpl<T, X>[0]] : [AsSeqImpl<T, X>[0], ...AsSeq2<T, IntInc<X>>];
