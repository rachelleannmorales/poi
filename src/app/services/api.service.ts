import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { PointOfInterest } from '../models/pointOfInterest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    endpoint = environment.APIEndpoint;
    httpOptions = {
        headers: new HttpHeaders(),
        withCredentials: false
    };
    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = null;
        body = res;
        return body.map((poi) => new PointOfInterest(poi));
    }
    setHttpHeaders() {
        this.httpOptions.headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest'
        });
    }

    getPointOfInterests(params?): Observable<PointOfInterest[]> {
        return this.http.get(this.endpoint + 'pois', this.httpOptions).pipe(
            map(this.extractData));
    }

    savePointOfInterest(name, latitude, longitude): Observable<PointOfInterest> {
        return this.http.post(this.endpoint + 'poi', {
            'name': name,
            'latitude': latitude,
            'longitude': longitude
        }, this.httpOptions).pipe(
            map(this.extractData));
    }
}
