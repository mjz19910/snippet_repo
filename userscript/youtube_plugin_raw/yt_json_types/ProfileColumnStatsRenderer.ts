type ProfileColumnStatsEntryData={
	label: TextWithRuns;
	value: TextWithRuns;
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
