import { generateID, filterTopApps, prepareHostsByApp } from '@/app/helpers/helpers';

const mockApplication = {
    name: 'Test Application 1 - New Relic, Inc.',
    contributors: [
        'A',
        'B',
        'C'
    ],
    version: 1,
    apdex: 90,
    host: [
        '12345-host.com',
        '67890-host.com'
    ]
};
const mockApplicationsArray = [
    {
        name: 'Test Application 1 - New Relic, Inc.',
        contributors: [
            'A',
            'B',
            'C'
        ],
        version: 1,
        apdex: 90,
        host: [
            '12345-host.com',
            '67890-host.com'
        ]
    },
    {
        name: 'Test Application 2 - New Relic, Inc.',
        contributors: [
            'A',
            'B',
            'C'
        ],
        version: 1,
        apdex: 100,
        host: [
            '12345-host.com',
            'ABCDE-host.com'
        ]
    },
];

test('Should generate a number', () => {
    const id = generateID();
    expect(id).not.toBeNaN();
});

test('Should generate a random number', () => {
    const id1 = generateID();
    const id2 = generateID();
    expect(id1).not.toEqual(id2);
});

test('Should return descending order', () => {
    const ordered = filterTopApps(mockApplicationsArray);
    expect(ordered[0].apdex).toBeGreaterThanOrEqual(ordered[1].apdex);
});

test('Should return a list of 25 max', () => {
    const ordered = filterTopApps(mockApplicationsArray);
    expect(ordered.length).toBeLessThanOrEqual(25);
});

test('Should return same number of keys as hosts', () => {
    const prep = prepareHostsByApp([mockApplication]);
    const hostsAsKeys = Object.keys(prep);
    expect(hostsAsKeys.length).toEqual(mockApplication.host.length);
});

test('Should return same keys as hosts', () => {
    const prep = prepareHostsByApp([mockApplication]);
    expect(prep[mockApplication.host[0]]).toBeDefined();
    expect(prep[mockApplication.host[1]]).toBeDefined();
});