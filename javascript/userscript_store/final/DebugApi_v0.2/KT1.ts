export type KT1<U, T> = T extends keyof U ? T extends number ? [0, U[T]] : ['n2', T] : ['f', T];
