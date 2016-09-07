export class DataService {
    static instance: DataService;
    data;

    static getInstance(): DataService {
        if(!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    constructor() {
        this.data = require('./data/2016scheduledata.json');
    }

    getData(type: string) {
        return this.data[type];
    }
}