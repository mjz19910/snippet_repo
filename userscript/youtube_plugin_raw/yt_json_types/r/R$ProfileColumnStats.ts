type D_ProfileColumnStatsEntry={
	label: R_TextWithRuns;
	value: R_SimpleText;
};
type R_ProfileColumnStatsEntry={profileColumnStatsEntryRenderer: D_ProfileColumnStatsEntry;};
type D_ProfileColumnStats={
	items: R_ProfileColumnStatsEntry[];
};
type R_ProfileColumnStats={profileColumnStatsRenderer: D_ProfileColumnStats;};