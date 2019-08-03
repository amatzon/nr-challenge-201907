const template = (data: {[key: string]: any}) => `
    <h1>${data.title}</h1>
    <p>${data.email}</p>
`;

export class Header {
    private MOUNT: string = 'app-header';

    private templateData: {[key: string]: any} = {};
    
    constructor(options: {[key: string]: any} = {}) {
        this.templateData.email = options.email;
        this.templateData.title = 'Apps by Hosts'
    }

    init() {
        const app: HTMLElement | null = document.getElementById('app');
        if (app) {
            app.insertAdjacentHTML('afterbegin', template(this.templateData));
        }   
        console.log('Header init');
    }
}