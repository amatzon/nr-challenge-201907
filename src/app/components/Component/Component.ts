import { generateID } from '@/app/helpers/helpers';
import { getJSON } from '@/app/helpers/xhr'

const template = function (data: {[key: string]: any}) {
    return `<div data-id="${data.id}"></div>`;
};

/**
 * Component Class
 * Base component class for all components
 */
export class Component {
    public mountPoint: string = '';
    public template = template;
    public id: number = 0;
    public templateData: {[key: string]: any} = {};

    constructor(options: {[key: string]: any}) {
        this.setMount(options.selector);
        this.setTemplate(options.template);
        this.setID();
        this.templateData.id = this.getID();
    }

    init(options: {[key: string]: any} = {}) {
        this.render(this.templateData);
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
        this.id = generateID();
    }

    getID(): number {
        return this.id;
    }

    loadData(path: string): Promise<any> {
        return getJSON(path);
    }
}