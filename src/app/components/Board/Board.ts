import { getJSON } from '@/app/helpers/xhr'

export class Board {
    constructor() {}

    loadData(path: string): Promise<any> {
        return getJSON(path)
    }
}