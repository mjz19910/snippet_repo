export class Event {
    /**
     * @param {any} type
     * @param {any} event_map
     */
    constructor(type,event_map) {
        this.type=type
        if(event_map) this.event_map=event_map
    }
}
