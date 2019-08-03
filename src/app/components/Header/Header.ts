const template = (data: {[key: string]: any}) => `
    <h1>${data.title}</h1>
`;

export class Header {
    
    constructor() {}

    init(data: {[key: string]: any} = {}) {
        data.title = 'TEST';
        const app: HTMLElement | null = document.getElementById('app');
        if (app) {
            app.insertAdjacentHTML('afterbegin', template(data))
        }   
        console.log('Header init');
    }
}