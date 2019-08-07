import { Component } from "@/app/components/Component/Component";

const template = function(data: {[key: string]: any}) {
    return `<li class="list-item" id="ListItem_${data.id}">${data.item}</li>`;
}

/**
 * ListItem Class
 * @extends Component
 */
export class ListItem extends Component {
    public template = template;

    constructor(options: {[key: string]: any}) {
        super(options);
    }

    init(options: {[key: string]: any}) {
        this.templateData.item = options.item;

        this.render(this.templateData);
    }
}