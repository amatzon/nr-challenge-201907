import { Board } from "@/app/components/Board/Board";

export class HostBoard extends Board {
    constructor(options: {[key: string]: any} = {}) {
        super();
    }

    init() {
        console.log('HostBoard init')
    }
}