import {calc_ratio} from "final/version_0.1/rebuild_the_universe_auto_v0.1";
import {AutoBuy} from "types/AutoBuy";

export type TimerTypeTag = 1 | 2;
export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
export const cint_arr: any[] = [];
export const auto_buy_obj = new AutoBuy;
export var atomepersecond=0;
export var totalAtome=0;
export var prestige=0;



console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");


export type RemoteTimerApiInfo = {
	async_reply_msg_id: 1,
	timer_reply_msg_id: 2,
	reply_msg_id: 100,
	fire_single_msg_id: 101,
	fire_repeating_msg_id: 102,
	remote_reply_msg_id: 200,
	worker_update_code: 201,
	async_worker_ready_msg_id: 202,
	set_single_msg_id: 203,
	set_repeating_msg_id: 204,
	clear_single_msg_id: 205,
	clear_repeating_msg_id: 206,
	clear_any_msg_id: 207,
	set_single: "setTimeout",
	set_repeating: "setInterval",
	clear_single: "clearTimeout",
	clear_repeating: "clearInterval"
}