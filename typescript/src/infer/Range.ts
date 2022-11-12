export type Range<T extends object,I>=T extends 0? [0,I]:Range<T,I>;
