type SettingsPages=
	|`account${""|`_${AccountPageSettingsSections}`}`
	|"account_advanced"
	|"account_overview"
	|"report_history"
	|"unlimited"
	;

type BrowseIdType=
	[
		"FEhashtag",
	][number]
	|`FE${BrowseEndpointPages}`
	|`VL${`${"LL"|"WL"|"PL"}${string}`}`
	|`UC${string}`
	|`SP${SettingsPages}`
	|`MP${"TRt"|"REb"|"LYt"}_${string}`;