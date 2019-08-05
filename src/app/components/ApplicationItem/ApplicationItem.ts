import { ListItem } from "@/app/components//ListItem/ListItem";
import './style.scss';
import { throws } from "assert";

const template = function(data: {[key: string]: any}) {
    return `     
        <div class="listitem__index">${data.apdex}</div>
        <div class="listitem__name">${data.item}</div>
    `;
}

export class ApplicationItem extends ListItem {
    public template = template;
    private element: HTMLElement | null = null;
    private version: number = 0;
    private item: string = '';

    constructor(options: {[key: string]: any}) {
        super(options);
    }

    init(options: {[key: string]: any}) {
        this.version = options.version;
        this.item = options.item;
        this.templateData.apdex = options.apdex;
        this.templateData.item = options.item;
        
        this.render(this.templateData);
        this.initListeners();
    }

    render(data: {[key: string]: any} = {}): void {
        const appElement = document.getElementById(this.mountPoint);
        if (!appElement) {
            throw new Error(`Component mount failed! Cannot find element #${this.mountPoint} to mount the app to.`);
        }

        this.element = document.createElement('li');
        this.element.id = `ApplicationItem_${data.id}`;
        this.element.className = 'listitem--application';
        this.element.insertAdjacentHTML('afterbegin', this.template(data));
        appElement.appendChild(this.element);;
    }

    initListeners() {
        if (this.element) {
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`${this.item}\nRelease version: ${this.version}`);
            });
        }
    }
}