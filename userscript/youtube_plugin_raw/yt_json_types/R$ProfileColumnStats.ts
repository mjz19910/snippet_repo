type ProfileColumnStatsEntryData={
	label: D$TextWithRuns;
	value: D$SimpleText;
};

type ProfileColumnStatsEntryRenderer={
	profileColumnStatsEntryRenderer: ProfileColumnStatsEntryData;
};

type ProfileColumnStatsData={
	items: ProfileColumnStatsEntryRenderer[];
};

type ProfileColumnStatsRenderer={
	profileColumnStatsRenderer: ProfileColumnStatsData;
};
