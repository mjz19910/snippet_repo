import {Do} from "./Helpers.ts";
import * as Items from "./items.ts";
import {wall,faq,rozenbom,picQ,readyRoom,sickbay,sickbay_has_dead_klingon,v_10forward,after_lockdown,uQuarters,oLounge,hypospray,uSuddEnd,uFridgeOpen,burrow,larder,larRiver,larBoat,larDark,deathDome,grave,o,zbrogjdnfhvyensocuiehw,cosmology,pattern,pcnt,v_25_of_shares,on,off,keycard,members,green,red,picTable,picCup,picRef,larLake,larFm,larStairs,keep,floorFive,elevator,elev_boiler,boiler,mechanic,piping,something,someone,pipe3,pipe6,pipe7} from "./info.ts";

export type main={
	id: "main";
	links: [wall];
	quest_chain: [
		Do.ActivateRoom<faq>,
		Do.RunTakeAct<faq,Items.gandalf_magic_book>,
		Do.ActivateRoom<rozenbom>,
		Do.RunTakeAct<rozenbom,Items.small_green_lamp>,
		Do.ActivateRoom<picQ>,
		Do.RunTakeAct<picQ,Items.dead_klingon>,
		Do.ActivateRoom<readyRoom>,
		{type: "story"; action: "activate_room"; room: readyRoom; required: Items.dead_klingon;},
		Do.ActivateRoom<sickbay>,
		Do.ActivateStory<sickbay_has_dead_klingon>,
		Do.ActivateRoom<readyRoom>,
		{type: "story"; action: "activate_room"; after_story: "sickbay_has_dead_klingon";},
		Do.ActivateRoom<v_10forward,after_lockdown>,
		Do.ActivateRoom<uQuarters>,
		Do.RunTakeAct<uQuarters,Items.dead_romulan>,
		oLounge,
		Do.ActivateRoom<sickbay>,
		Do.RunTakeAct2<sickbay,2,hypospray>,
		uSuddEnd,
		Do.ActivateRoom<uFridgeOpen>,
		Do.RunTakeAct<uFridgeOpen,Items.hand_press>,
		burrow,
		larder,larRiver,larBoat,larDark,
		larDark,
		deathDome,
		grave,
		Do.RunTakeAct<grave,Items.fui>,
		o,
		zbrogjdnfhvyensocuiehw,
		cosmology,
		pattern,
		pcnt,
		Do.RunTakeAct<pcnt,v_25_of_shares>,
		Do.UseInventory<v_25_of_shares>,
		on,
		off,
		Do.RunTakeAct<off,keycard>,
		Do.UseMenu<members>,
		members,green,red,
		picQ,
		picTable,picCup,picRef,
		burrow,larder,larRiver,larBoat,
		larDark,larLake,
		Do.ActivateRoom<larFm>,
		Do.UseInventory2<[Items.hand_press,Items.fui]>,
		picQ,
		picTable,picCup,picRef,burrow,larder,larStairs,keep,floorFive,elevator,elev_boiler,boiler,
		mechanic,
		Do.UseAction<mechanic,hypospray>,
		piping,
		pipe3,pipe6,pipe7,
		Do.ActivateRoom<something>,
		Do.RunTakeAct<something,Items.something>,
		Do.ActivateRoom<someone>,
		Do.UseAction2<someone,0,Items.something>,
		Do.RunTakeAct2<someone,1,Items.glass_orb>
	];
	quest_chain2: [
		main,
		faq,
		Items.gandalf_magic_book
	];
	hidden: [
		"k",
	];
};
