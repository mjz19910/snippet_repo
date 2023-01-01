//spell:disable-next-line
const url2="/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false";
const url2_parsed=create_from_parse_partial(url2);
type url_pathname_parts=RemoveFirst<Split<typeof url2_parsed.pathname,"/">>;
