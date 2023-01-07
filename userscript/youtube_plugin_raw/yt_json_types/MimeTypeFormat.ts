type MimeTypeFormat=[
	`${"video/mp4"}; codecs="${acv1_codec}"`,
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
][number];
type Mimetype2=`${string}; codecs="${CodecTypeStr|GenericCodecType}"`;
function gv():MimeTypeFormat {
	throw 1;
}
const v1:MimeTypeFormat=gv();
const v2:Mimetype2=v1;
