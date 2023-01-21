type ProfileColumnStatsEntryData={
	label: TextWithRuns;
	value: SimpleText;
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
