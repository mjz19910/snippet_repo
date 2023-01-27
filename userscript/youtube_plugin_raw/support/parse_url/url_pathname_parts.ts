//spell:disable-next-line
const url2="/youtubei/v1/browse?key=[--snip--]&prettyPrint=false";
const url2_parsed=create_from_parse_partial(url2);
type url_pathname_parts=RemoveFirst<T_Split<typeof url2_parsed.pathname,"/">>;
