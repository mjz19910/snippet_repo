import {calc_ratio} from "final/rebuild_the_universe_auto_v0.1";
import {AutoBuy} from "types/AutoBuy";

export type TimerTypeTag = 1 | 2;
export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
export const cint_arr: any[] = [];
export const auto_buy_obj = new AutoBuy;



console.assert(calc_ratio([0, 0]) === 0, "calc ratio of array full of zeros does not divide by zero");
