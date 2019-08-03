import { Application } from '@/app/types/Application';

import { Board } from '@/app/components/Board/Board';

export class HostBoard extends Board {
    private JSON_DATA: string = '/data/host-app-data.json';
    private data: Application[] = [];

    constructor(options: {[key: string]: any} = {}) {
        super();
    }

    init() {
        console.log('HostBoard init')
        super.loadData(this.JSON_DATA).then(
            (response) => {
                this.data = this.parseData(response.data);
            },
            (response) => {
                console.error(response);
            }
        )
    }

    private generateId(): number {
        return Math.floor(Math.random() * 10000);
    }

    private parseData(data: []) {
        return data.map((app: Application) => {
            app.id = this.generateId();
            return app;
        })
    }
}