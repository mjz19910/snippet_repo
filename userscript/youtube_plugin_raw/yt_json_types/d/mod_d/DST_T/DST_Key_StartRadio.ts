type DST_Key_StartRadio=DST_MakeLM<"key","start_radio",0|1>;
type DST_Key_StartRadio_Bad=DST_MakeLM_FromObj<DI_Key_StartRadio, "key", "start_radio", T_DI_FromObj<{
	start_radio: 0 | 1;
}>>;