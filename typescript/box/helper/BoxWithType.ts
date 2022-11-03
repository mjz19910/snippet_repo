import {BoxInterface} from "box/BoxInterface.js";
import {Box} from "../Box.js"

export type BoxWithType=Extract<Box,BoxInterface>
