import { Application } from '@/app/types/Application';

import { Board } from '@/app/components/Board/Board';
import { HostCard } from '@/app/components/HostCard/HostCard';

const template = function(data: {[key: string]: any}) {
    return `
        <div class="board board--host" id="HostBoard_${data.id}">
            <div class="board__cards" id="HostBoardCards_${data.id}"></div>
        <//div>
    `;
};

export class HostBoard extends Board {
    public template = template;
    private jsonPath: string = '/data/host-app-data.json';
    private data: Application[] = [];
    private hosts: string[] = [];
    private appsByHosts: {[key: string]: Application[]} = {};
    private topAppsByHosts: {[key: string]: Application[]} = {};
    private childComponents: any[] = [];

    constructor(options: {[key: string]: any} = {}) {
        super(options);
    }

    init() {
        this.loadData(this.jsonPath).then(
            (response) => this.onSuccess(response),
            (response) => this.onError(response)
        );
    }

    onSuccess(response: {[key: string]: any}): void {
        this.data = this.parseData(response.data);
        this.appsByHosts = this.prepareHosts(this.data);
        this.hosts = Object.keys(this.appsByHosts);

        this.render(this.templateData);

        this.hosts.forEach((hostName) => {
            const topApps = this.filterTopApps(this.appsByHosts[hostName]);
            const hostCard = new HostCard({selector: `HostBoardCards_${this.id}`});

            this.topAppsByHosts[hostName] = topApps;
            this.childComponents = Array().concat(this.childComponents, hostCard);
            hostCard.init({title: hostName, list: topApps});
        });

        this.exposeMethods();
    }

    onError(response: {[key: string]: any}): void {
        // no-op
        console.error(response);
    }

    private exposeMethods() {
        (window as any).getTopAppsByHost = (hostName: string) => this.getTopAppsByHost(hostName);
    }

    private getTopAppsByHost(hostName: string = '') {
        if (!hostName) {
            console.error(`Can't retrieve top apps! Please provide a host name.`);
            return;
        }

        if (!this.topAppsByHosts.hasOwnProperty(hostName)) {
            console.error(`No host was found with name "${hostName}"!`);
            return;
        }

        this.topAppsByHosts[hostName].forEach((app: Application, i) => {
            console.log(`${i+1}. ${app.name}\n`);
        });
    }

    private parseData(data: []) {
        return data.map((app: Application) => {
            app.id = this.getID();
            return app;
        })
    }

    private prepareHosts(data: Application[]) {
        const appsByHosts: {[key: string]: Application[]} = {};
        for (let i = 0, l = data.length; i < l; i++) {
            const application = data[i];
            const hosts = data[i].host;
            if (hosts.length > 0) {
                for (let j = 0, k = hosts.length; j < k; j++) {
                    const hostName = hosts[j];
                    if (appsByHosts.hasOwnProperty(hostName)) {
                        appsByHosts[hostName].push(application);
                    } else {
                        appsByHosts[hostName] = [application];
                    } 
                }
            }
        }

        return appsByHosts;
    }

    private filterTopApps(apps: Application[]) {
        const appsOrdered = [...apps];
        appsOrdered.sort((a, b) => {
            return b.apdex - a.apdex
        })
        return appsOrdered.slice(0, 25);
    }
}