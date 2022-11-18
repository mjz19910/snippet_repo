import {RecordKey} from "./InstanceRecord.js";

export type RepeatMapType<A,B extends RecordKey<A>,C extends InstanceType<B>>=Map<A,AnyOrRepeat<C>>;
