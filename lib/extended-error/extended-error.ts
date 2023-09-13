export class ExtendedError<T> extends Error {
    data: T;
    constructor(name: string, message: string, data: T) {
        super(message);
        this.name = name;
        this.data = data;
    }

    logError() {
        console.error(`${this.name}: ${this.message}`);
        console.error('Additional Data:', this.data);
    }
}
