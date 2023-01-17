type BrowseIdType=
	|`FE${BrowseEndpointPages}`
	|`VL${`${"LL"|"WL"|"PL"}${string}`}`
	|`UC${string}`
	|`SP${`account${""|`_${AccountPageSettingsSections}`}`}`
	|`MP${"TRt"|"REb"|"LYt"}_${string}`;