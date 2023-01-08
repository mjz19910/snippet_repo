type MimeTypeFormat=[
	`video/mp4; codecs="${acv1_codec}"`,
	`video/mp4; codecs="av01.0.08M.08"`,
	`video/webm; codecs="vp9"`,
	`audio/mp4; codecs="mp4a.40.2"`,
	`audio/webm; codecs="opus"`,
][number];
type CodecTypeStr=[
	"opus",
	"vp9",
][number];
type CodecType=[
	CodecTypeStr,
	SplitOnce<GenericCodecType,".">[0]
][number];
type GenericCodecType=[
	acv1_codec,
	"mp4a.40.2",
	// av1 profile=0 level_id=08M bit_depth=8-bit
	"av01.0.08M.08",
][number];
type Mimetype2=`${string}; codecs="${CodecTypeStr|GenericCodecType}"`;
function gv():MimeTypeFormat {
	throw 1;
}
const v1:MimeTypeFormat=gv();
const v2:Mimetype2=v1;
