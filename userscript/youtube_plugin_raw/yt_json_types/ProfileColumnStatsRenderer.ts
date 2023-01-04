type ProfileColumnStatsEntryData={
	label: TextT;
	value: TextT;
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
