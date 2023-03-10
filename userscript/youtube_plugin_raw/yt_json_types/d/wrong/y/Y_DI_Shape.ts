type Y_DI_Shape<K1 extends string,K2 extends string>=T_DI_FromObj2<{[U in K1]: T_DI_FromObj<{[U in K2]: any;}>;}>;
