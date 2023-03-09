type Ret_w_diz<T extends DIZ_Item_AB<string,U>,U>=["one",["1",U],T['z'][0],T]|
["arr",["2",U[]],T['z'][0],T]|
["many",["3",U[][]],T['z'][0],T]|
["typeof_name",["t",T_GetTypeof<U>],T['z'][0],T]|
["instance_name",["i","array"],T['z'][0],T];
