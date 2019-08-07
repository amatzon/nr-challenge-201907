import { ListItem } from "@/app/components//ListItem/ListItem";
import './style.scss';
import { throws } from "assert";

const template = function(data: {[key: string]: any}) {
    return `     
        <div class="listitem__index">${data.apdex}</div>
        <div class="listitem__name">${data.item}</div>
    `;
}

/**
 * ApplicationItem
 * @extends ListItem
 * @extends Component
 */
export class ApplicationItem extends ListItem {
    public template = template;
    private element: HTMLElement | null = null;
    private version: number = 0;
    private item: string = '';

    constructor(options: {[key: string]: any}) {
        super(options);
        this.onClick = this.onClick.bind(this);
    }

    init(options: {[key: string]: any}) {
        this.version = options.version;
        this.item = options.item;
        this.templateData.apdex = options.apdex;
        this.templateData.item = options.item;
        
        this.render(this.templateData);
        this.initListeners();
    }

    /**
     * Overwrite render function from Component
     * An HMTL Element needs to be create to be able to attach event listeners
     * @param data 
     */
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

    onClick(e: Event) {
        e.preventDefault();
        alert(`${this.item}\nRelease version: ${this.version}`);
    }

    initListeners() {
        if (this.element) {
            this.element.addEventListener('click', this.onClick);
        }
    }

    removeListeners() {
        if (this.element) {
            this.element.removeEventListener('click', this.onClick);
        }
    }
}