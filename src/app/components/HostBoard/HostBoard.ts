import { Application } from '@/app/types/Application';
import { Board } from '@/app/components/Board/Board';
import { HostCard } from '@/app/components/HostCard/HostCard';
import './style.scss';

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
    private appsByHosts: {[key: string]: Application[]} = {};
    private childComponents: {[key: string]: HostCard} = {};

    constructor(options: {[key: string]: any} = {}) {
        super(options);
    }

    init() {
        this.loadData(this.jsonPath).then(
            (response) => this.onSuccess(response),
            (response) => this.onError(response)
        );
        this.exposeMethods();
    }

    onSuccess(response: {[key: string]: any}): void {
        this.data = response.data;
        this.appsByHosts = this.prepareHosts(this.data);

        this.render(this.templateData);

        Object.keys(this.appsByHosts).forEach((hostName) => {
            const hostCard = new HostCard({selector: `HostBoardCards_${this.id}`});
            this.childComponents[`HostCard_${hostName}`] = hostCard;
            hostCard.init({title: hostName, list: [...this.filterTopApps(this.appsByHosts[hostName])]});
        });
    }

    onError(response: {[key: string]: any}): void {
        // no-op
        console.error(response);
    }

    private exposeMethods() {
        (window as any).getTopAppsByHost = (hostName: string) => this.getTopAppsByHost(hostName);
        (window as any).removeAppFromHosts = (appName: string) => this.removeAppFromHosts(appName);
        (window as any).addAppToHosts = (application: Application) => this.addAppToHosts(application)
    }

    private getTopAppsByHost(hostName: string = '') {
        if (!hostName || typeof hostName !== 'string') {
            console.error(`Can't retrieve top apps! Please provide a host name.`);
            return;
        }

        if (!this.appsByHosts.hasOwnProperty(hostName)) {
            console.error(`No host was found with name "${hostName}"!`);
            return;
        }

        const topAppsByHosts = this.filterTopApps(this.appsByHosts[hostName]);

        topAppsByHosts.forEach((app: Application, i) => {
            console.log(`${i+1}. ${app.name} (${app.apdex})\n`);
        });
    }

    private removeAppFromHosts(appName: string): void {
        if (!appName || typeof appName !== 'string') {
            console.error(`Please provide the application's name you want to remove.`);
            return;
        }

        // Cache host findings
        const foundInHosts: string[] = [];

        // Create new app list for each host
        Object.keys(this.appsByHosts).forEach((hostName) => {
            const appsByHost = this.appsByHosts[hostName].reduce(
                (apps: Application[], app: Application, index: number): Application[] => {
                    // Do not add back selected app
                    if (app.name !== appName) {
                        apps.push(app);
                    }
                    if (app.name === appName) foundInHosts.push(hostName);
                    return apps;
                },
            [] as Application[]);

            this.appsByHosts[hostName] = appsByHost;
        });

        if (foundInHosts.length) {
            foundInHosts.forEach((hostName) => {
                // Rerender Cards
                this.updateCardList(hostName, this.filterTopApps(this.appsByHosts[hostName]));
            })
        } else {
            console.info(`Could not find any app with the name "${appName}".`);
        }
    }

    private addAppToHosts(app: Application): void {
        if (!app || typeof app !== 'object') {
            console.error('Cannot add application to hosts.');
            return;
        }

        if (!app.name || !app.apdex) {
            console.error('Application is missing a name and/or apdex number.');
            return;
        }

        if (!app.host || !app.host.length) {
            console.error('Application is missing host(s).');
            return;
        }

        const hostNames = app.host;
        // Optimistically add app to it's hosts. We don't check if it exists already
        hostNames.forEach((hostName) => {
            let appsByHost = this.appsByHosts[hostName];
            if (appsByHost) {
                // Add app
                this.appsByHosts[hostName] = [...appsByHost, app];
                // Update rendered cards
                this.updateCardList(hostName, this.filterTopApps(this.appsByHosts[hostName]));
                return;
            } else {
                // Create host with app if did not exist before
                this.appsByHosts[hostName] = [app];
            }
        });
    }

    private updateCardList(hostName: string, list: Application[]) {
        const hostCard = this.childComponents[`HostCard_${hostName}`];
        if (hostCard) hostCard.updateList([...list]);
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
        let appsOrdered = [...apps];
        appsOrdered.sort((a, b) => {
            return b.apdex - a.apdex;
        });
        appsOrdered = appsOrdered.slice(0, 25);
        return appsOrdered;
    }
}