import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: "Temasek Polytechnic",
      latitude: "1.34502225",
      longitude: "103.93306210494765",
      Address: "21 Tampines Ave 1, Singapore 529757",
      hours: 'Weekdays: 7.15am - 9pm',
      hours2: 'Weekends: 7.15am - 3pm',
      contact: '6788 2000',
      email: 'enquiry@tp.edu.sg',
      Loc: "https://goo.gl/maps/hWqPdZYdm4SnhbuQ9"
    }
  ];

  constructor() { }


  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        Address: marker.Address,
        hours: marker.hours,
        hours2: marker.hours2,
        contact: marker.contact,
        email: marker.email,
        Loc: marker.Loc
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  showMap() {
    const location = new google.maps.LatLng(1.34502225, 103.93306210494765);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id = "content">' + '<h2 id = "firstHeading" class = "firstHeading">' + marker.title + '</h2>'
      + '<p> Address: ' + marker.Address + '<p>'
      + '<p> Contact: ' + marker.contact + '<p>'
      + '<p> Email: ' + marker.email + '<p>'
      + '<p> Opening Hours: <p>'
      + '<p>' + marker.hours + '<p>'
      + '<p>' + marker.hours2 + '<p>'
    '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow)
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }
  ngOnInit() {
  }

}
