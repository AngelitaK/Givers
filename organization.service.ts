import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  API_KEY = '858079913bb648a481953c47460c10f2';

  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  //homepage
  getAll() {
    return this.firestore.collection('home').valueChanges({ idField: 'id' });
  }

  getCategory() {
    return this.firestore.collection('home').valueChanges({ idField: 'id' });
  }
  getOneElderly(id) {
    return this.firestore.collection('elderly').doc(id).valueChanges();
  }
  getOneMigrant(id) {
    return this.firestore.collection('migrantworker').doc(id).valueChanges();
  }
  getOneChildren(id) {
    return this.firestore.collection('children').doc(id).valueChanges();
  }
  getOneFundraising(id) {
    return this.firestore.collection('fundraising').doc(id).valueChanges();
  }
  getOneAnimal(id) {
    return this.firestore.collection('animalwelfare').doc(id).valueChanges();
  }
  getOneDisability(id) {
    return this.firestore.collection('disability').doc(id).valueChanges();
  }

  // searchData(org) { // Calls when search is performed
  //   return this.firestore.collection('home' + org);
  // }

  //1. elderly
  getElderly() {
    return this.firestore.collection('elderly').valueChanges({ idField: 'id' });
  }

  //2. children
  getChildren() {
    return this.firestore.collection('children').valueChanges({ idField: 'id' });
  }

  //3. disability
  getDisability() {
    return this.firestore.collection('disability').valueChanges({ idField: 'id' });
  }

  getAllDisability() {
    return this.firestore.collection('disability').valueChanges({ idField: 'id' });
  }

  //4. migrant worker
  getMigrant() {
    return this.firestore.collection('migrantworker').valueChanges({ idField: 'id' });
  }

  //5. animal
  getAnimal() {
    return this.firestore.collection('animalwelfare').valueChanges({ idField: 'id' });
  }

  //6. fundraising
  getFundraising() {
    return this.firestore.collection('fundraising').valueChanges({ idField: 'id' });
  }

  //get one for payment
  getOneCat(category, id) {
    return this.firestore.collection(category).doc(id).valueChanges();
  }

  //news service
  loadAll() { // Calls when app loads 
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=sg&category=health&apiKey=${this.API_KEY}`);
  }
  // loadAll(){
  //   return this.http.get("http://api.coronatracker.com/v2/analytics/country");
  // }
}
