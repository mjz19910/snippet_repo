type D_ProfileColumnStatsEntry={
	label: D_Text;
	value: D_Text;
};
type R_ProfileColumnStatsEntry={profileColumnStatsEntryRenderer: D_ProfileColumnStatsEntry;};
type D_ProfileColumnStats={
	items: R_ProfileColumnStatsEntry[];
};
type R_ProfileColumnStats={profileColumnStatsRenderer: D_ProfileColumnStats;};