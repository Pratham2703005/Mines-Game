// utils/queue.js
class LimitedQueue {
    constructor(limit = 50) {
        if (LimitedQueue.instance) return LimitedQueue.instance; // Singleton pattern

        this.limit = limit;
        this.queue = JSON.parse(localStorage.getItem('myQueue')) || [];
        LimitedQueue.instance = this;
    }

    enqueue(item) {
        if (this.queue.length >= this.limit) {
            this.queue.shift();
        }
        this.queue.push(item);
        this.updateLocalStorage();
    }

    dequeue() {
        const item = this.queue.shift();
        this.updateLocalStorage();
        return item;
    }

    updateLocalStorage() {
        localStorage.setItem('myQueue', JSON.stringify(this.queue));
    }

    getQueue() {
        return this.queue;
    }
}

const queueInstance = new LimitedQueue(); // Singleton instance

export default queueInstance;
