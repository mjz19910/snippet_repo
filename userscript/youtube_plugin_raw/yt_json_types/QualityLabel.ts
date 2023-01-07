type QualArr=[
	...make_qual_for_fps<50>,
	...make_qual_for_fps<60>,
	"1080p","720p","480p","360p","240p","144p",
];
type make_qual_for_fps<T extends 50|60>=[`2160p${T}`,`1440p${T}`,`1080p${T}`,`720p${T}`,];
type QualityLabel=QualArr[number];
