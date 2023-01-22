type ProfileColumnStatsEntryData={
	label: D$TextWithRuns;
	value: D$SimpleText;
};

type R$ProfileColumnStatsEntry={
	profileColumnStatsEntryRenderer: ProfileColumnStatsEntryData;
};

type ProfileColumnStatsData={
	items: R$ProfileColumnStatsEntry[];
};

type R$ProfileColumnStats={
	profileColumnStatsRenderer: ProfileColumnStatsData;
};
