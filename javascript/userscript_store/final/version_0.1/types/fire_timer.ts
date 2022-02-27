import {RemoteTimer} from "./RemoteTimer";

export function fire_timer(timer: RemoteTimer, remote_id: number) {
	timer.fire(remote_id);
}
