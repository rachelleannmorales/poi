import { Component, OnInit } from '@angular/core';
import {ApiService} from './services/api.service';
import {PointOfInterest} from './models/pointOfInterest';

declare var ol: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'poi';
    dataSource: PointOfInterest[];
    displayedColumns = [ 'label', 'coordinates', 'action' ];
    name;
    latitude;
    longitude;
    map: any;

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService.getPointOfInterests().subscribe((pois) => {
            this.dataSource = pois;
            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([44.406161, 33.282384]),
                    zoom: 12
                })
            });

            this.dataSource.forEach(poi => {
                this.addMapPoint(poi.name, poi.latitude, poi.longitude);
            });
        });

    }

    save() {
        this.apiService.savePointOfInterest(
            this.name,
            this.latitude,
            this.longitude
        )
            .subscribe(
                r => {
                    this.apiService.getPointOfInterests().subscribe((pois) => {
                        this.dataSource = pois;
                    });
                    this.addMapPoint(this.name, this.latitude, this.longitude);
                });
    }

    setCenter(name, latitude, longitude) {
        const coords = ol.proj.fromLonLat([parseFloat(longitude), parseFloat(latitude)]);
        this.map.getView().animate({center: coords, zoom: 15});
    }

    addMapPoint(name, latitude, longitude) {
        const vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([parseFloat(longitude), parseFloat(latitude)], 'EPSG:4326', 'EPSG:3857')),
                })]
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [1, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    fill: new ol.style.Fill({ color: '#000' }),
                    stroke: new ol.style.Stroke({
                        color: '#fff', width: 2
                    }),
                    text: name
                })
            })
        });
        this.map.addLayer(vectorLayer);
    }
}
