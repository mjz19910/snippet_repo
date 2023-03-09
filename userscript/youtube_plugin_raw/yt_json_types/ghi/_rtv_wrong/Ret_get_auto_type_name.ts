type Ret_get_auto_type_name="RMD_Badge"|
	`TA_OpenPopup<T_OpenPopup_Dialog<${string}>>`|
	`TA_OpenPopup<T_OpenPopup_Toast<${string}>>`|
	"A_OpenPopup"|
	"{}"|
	`D_${"PrefetchHintConfig"}`|
	"R_TwoColumnBrowseResults"|
	"GE_Browse"|
	`C_${T_Split<Extract<Ret_json_auto_replace_1,`${string}Command`>,"Command">[0]}`;
