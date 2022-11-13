// import stuck

import {create_message_channel} from "./create_message_channel.js"
import {on_port_message} from "./on_port_message.js";

export let message_channel=create_message_channel(on_port_message)
