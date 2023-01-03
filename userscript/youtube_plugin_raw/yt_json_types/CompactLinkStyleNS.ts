namespace CompactLinkStyleNS {
	export type EnumS="COMPACT_LINK_STYLE_TYPE";
	type EnumVal=[
		"SETTINGS_SIDEBAR",
		"ACCOUNT_SWITCHER_FOOTER"
	][number];
	export type Enum=[
		`${EnumS}_${EnumVal}`
	][number];
}
