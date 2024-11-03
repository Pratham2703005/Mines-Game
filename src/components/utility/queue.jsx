class LimitedQueue {
    constructor(limit = 250) {
        if (LimitedQueue.instance) return LimitedQueue.instance;

        this.limit = limit;

        // Safely parse the queue from localStorage
        const storedQueue = localStorage.getItem('myQueue');
        this.queue = storedQueue ? JSON.parse(storedQueue) : []; // Handle null or empty

        // Ensure the queue is an array
        if (!Array.isArray(this.queue)) {
            this.queue = []; // Reset to an empty array if parsing failed
        }

        LimitedQueue.instance = this;
    }

    enqueue(item) {
        if (this.queue.length >= this.limit) {
            this.queue.shift();
        }
        this.queue.push(item);
        this.updateLocalStorage();
        
        // Trigger custom event for localStorage update
        window.dispatchEvent(new CustomEvent('queueUpdated', { detail: { action: 'enqueue', item } }));
    }

    dequeue() {
        const item = this.queue.shift();
        this.updateLocalStorage();
        
        // Trigger custom event for localStorage update
        window.dispatchEvent(new CustomEvent('queueUpdated', { detail: { action: 'dequeue', item } }));
        
        return item;
    }

    clearQueue() {
        this.queue = [];
        this.updateLocalStorage();
        window.dispatchEvent(new CustomEvent('queueUpdated', { detail: { action: 'clear' } }));
    }

    updateLocalStorage() {
        localStorage.setItem('myQueue', JSON.stringify(this.queue));
    }

    getQueue() {
        return this.queue;
    }

    getLastItem() {
        return this.queue[this.queue.length - 1];
    }

    getQueueReversed() {
        return [...this.queue].reverse();
    }
}

const queueInstance = new LimitedQueue();
export default queueInstance;
