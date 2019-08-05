import { ListItem } from "@/app/components//ListItem/ListItem";

const template = function(data: {[key: string]: any}) {
    return `
        <li class="list-item" id="ListItem_${data.id}">
            <div>tst ${data.item}</div>
        </li>
    `;
}

export class ApplicationItem extends ListItem {
    public template = template;

    constructor(options: {[key: string]: any}) {
        super(options);
    }
}