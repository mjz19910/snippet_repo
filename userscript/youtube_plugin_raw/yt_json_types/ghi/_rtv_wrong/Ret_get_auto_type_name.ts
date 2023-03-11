type G_ShortTypeName=
	|"R_TwoColumnBrowseResults"
	|"A_OpenPopup"
	|`C_${T_Split<Extract<Ret_json_auto_replace_1,`${string}Command`>,"Command">[0]}`
	|"GE_Browse"
	|"RMD_Badge"
	;
;

type Ret_get_auto_type_name=
	|"{}"
	|`D_${"PrefetchHintConfig"}`
	|`TA_OpenPopup<T_OpenPopup_Dialog<${string}>>`
	|`TA_OpenPopup<T_OpenPopup_Toast<${string}>>`
	|G_ShortTypeName
	;
;
