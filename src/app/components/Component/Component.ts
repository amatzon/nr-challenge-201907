import { genetateID } from '@/app/helpers/helpers';

const template = function (data: {[key: string]: any}) {
    return `<div></div>`;
};

export class Component {
    public mountPoint: string = '';
    public template = template;
    public id: number = 0;
    public childComponents: {[key: string]: Component} = {};

    constructor(options: {[key: string]: any}) {
        this.setMount(options.selector);
        this.setTemplate(options.template);
        this.setID();
    }

    init() {
        this.render({});
        this.initChildComponents();
    }

    setTemplate(template: (() => string)): void {
        this.template = template;
    }

    setMount(selector: string): void {
        this.mountPoint = selector;
    }

    render(data: {[key: string]: any} = {}): void {
        const appElement = document.getElementById(this.mountPoint);
        if (!appElement) {
            throw new Error(`Component mount failed! Cannot find element #${this.mountPoint} to mount the app to.`);
        }
        appElement.insertAdjacentHTML('afterbegin', this.template(data));
    }

    setID(): void {
        this.id = genetateID();
    }

    getID(): number {
        return this.id;
    }

    initChildComponents(): void {
        Object.keys(this.childComponents).forEach((componentName) => {
            this.childComponents[componentName].init();
        })
    }
}