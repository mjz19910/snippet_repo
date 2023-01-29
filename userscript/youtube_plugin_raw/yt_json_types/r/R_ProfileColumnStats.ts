type D_ProfileColumnStatsEntry={
	label: G_Text;
	value: G_Text;
};
type R_ProfileColumnStatsEntry={profileColumnStatsEntryRenderer: D_ProfileColumnStatsEntry;};
type D_ProfileColumnStats={
	items: R_ProfileColumnStatsEntry[];
};
type R_ProfileColumnStats={profileColumnStatsRenderer: D_ProfileColumnStats;};