import { Component } from "@/app/components/Component/Component";

const template = function (data: {[key: string]: any}) {
    return `
        <li>
            <article>
                <h2>${data.title}</h2>
                <div>TE</div>
            </article>
        </li>
    `;
};

export class Card extends Component {
    public template = template;
    // public title: string = '';
    // public list: any[] = [];

    constructor(options: {[key: string]: any} = {}) {
        super(options);
        this.templateData.title = options.title;
        this.templateData.list = options.list;
    }

    // init() {
    //     console.log('init', this.id)
    // }
}