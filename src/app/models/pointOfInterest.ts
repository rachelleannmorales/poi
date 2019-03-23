export class PointOfInterest {
    id: number;
    name: string;
    latitude: number;
    longitude: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
