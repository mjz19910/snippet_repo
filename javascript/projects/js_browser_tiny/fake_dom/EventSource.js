export class EventSource {
    constructor() {
        this.listeners = {};
    }
    addEventListener(e, fn) {
        if(this.listeners[e]) {
            this.listeners[e].push({t: e, fn: fn});
        } else {
            this.listeners[e] = [{t: e, fn: fn}];
        }
    }
}
