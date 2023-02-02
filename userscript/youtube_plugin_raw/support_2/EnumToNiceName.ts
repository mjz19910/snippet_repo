type EnumToNiceName<T extends string,U extends any[]=T_Split<Lowercase<T>,"_">>=Join<{[A in keyof U]: Capitalize<U[A]>;},"">;
