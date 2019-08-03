import { Component } from '@/app/components/Component/Component';

const template = function (data: {[key: string]: any}) {
    return `
        <h1>${data.title}</h1>
        <p>${data.email}</p>
    `;
};

export class Header extends Component {
    public mountPoint: string = 'app-header';
    public template = template;
    private title: string = 'Apps by Hosts';
    private templateData: {[key: string]: any} = {};
    
    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.templateData.email = options.email;
        this.templateData.title = this.title;
    }

    init() {
        this.render(this.templateData);
    }
}