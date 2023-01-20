type reel$player_param=[
	Extract<category$param,`reel.${string}`>,
	"reel.player_params.f30"|
	"reel.player_params"
][number];
