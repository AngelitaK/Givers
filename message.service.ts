import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  add(fullname, message, email): Promise<any> {
    return this.firestore.collection('donorwall').add({ fullname: fullname, message: message, email: email });
  }

  update(id, email: string, fullname: string, message: string): Promise<any> {
    return this.firestore.collection('donorwall').doc(id).set({ email: email, fullname: fullname, message: message })
      .then(value => {
        console.log('Update message service worked');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
  delete(id) {
    return this.firestore.collection('donorwall').doc(id).delete(),
    console.log('message deleted');
  }
  getAll() {
    return this.firestore.collection('donorwall').valueChanges({ idField: 'id' });
  }
  getOne(id) {
    return this.firestore.collection('donorwall').doc(id).valueChanges();
  }

}
