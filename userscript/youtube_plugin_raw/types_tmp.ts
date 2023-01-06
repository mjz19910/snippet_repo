type ApiUrlFormat=[
	"getDatasyncIdsEndpoint",
	"getAccountSwitcherEndpoint",
	`youtubei/v1/att/${"get"|"log"}`,
	`youtubei/v1/notification/${ApiNotificationLast}`,
	`youtubei/v1/subscription/${"subscribe"}`,
	`youtubei/v1/reel/${"reel_item_watch"|"reel_watch_sequence"}`,
	`youtubei/v1/like/${"like"|"removelike"}`,
	`youtubei/v1/${"browse"|"guide"|"next"|"player"}`,
	`youtubei/v1/live_chat/get_live_chat_replay`,
	`youtubei/v1/get_transcript`,
	`youtubei/v1/account/${"account_menu"|"accounts_list"|"set_setting"}`,
	`youtubei/v1/feedback`,
	`youtubei/v1/comment/create_comment`
][number];
type ApiUrlFormatFull=`https://www.youtube.com/${ApiUrlFormat}`;
type ApiFormatObj=[
	["youtubei",[["v1",[
		
	]]]]
]
type ApiNotificationLast=[
	"get_unseen_count",
	"get_notification_menu",
	"record_interactions",
	"modify_channel_preference",
][number];