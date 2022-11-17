/** @template T */

export class Queue {
    /**@returns {T} */
    dequeue() {
        let last=this.queue.pop();
        if(last === void 0) throw new Error("");
        return last;
    }
    is_empty() {
        return this.queue.length===0;
    }
    /**@type {T[]} */
    queue;
    constructor() {
        this.queue=[];
    }
}
