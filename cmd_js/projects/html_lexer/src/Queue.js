/** @template T */
export class Queue {
    /** @arg {T} arg0 */
    enqueue(arg0) {
        this.array_que.push(arg0);
    }
    /** @returns {T} */
    dequeue() {
        let last=this.array_que.pop();
        if(last===void 0) throw new Error("");
        return last;
    }
    is_empty() {
        return this.array_que.length===0;
    }
    /** @type {T[]} */
    array_que=[];
}
