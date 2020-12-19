export default class Stack {
    constructor(array = []) {
        this._= array;
    }

    push(value) {
        this._.push(value);
        return this;
    }

    pop() {
        this._.pop();
        return this;
    }

    top() {
        const len = this._.length;

        return len ? this._[len - 1] : undefined;
    }

    nextToTop() {
        const len = this._.length;

        return len > 1 ? this._[len - 2] : undefined;
    }

    toArray() {
        return this._;
    }

    fromArray(array) {
        this._ = array;
        return this;
    }
}