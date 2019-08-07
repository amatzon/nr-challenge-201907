import { Application } from '@/app/types/Application';

/**
 * Generate random number as an ID
 */
export const generateID = function() {
    return Math.floor(Math.random() * 10000);
}

/**
 * Groups all applications into their hosts
 * @param data List of applications
 */
export const prepareHostsByApp = function (data: Application[]) {
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

/**
 * Orders applications by their Apdex index, descending
 * @param apps List of applications
 */
export const filterTopApps = function (apps: Application[]) {
    let appsOrdered = [...apps];
    appsOrdered.sort((a, b) => {
        return b.apdex - a.apdex;
    });
    appsOrdered = appsOrdered.slice(0, 25);
    return appsOrdered;
}