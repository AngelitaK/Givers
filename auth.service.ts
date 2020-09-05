import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  email: string = ""

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string, fullname: string, birthday: string, contact: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        return this.firestore.collection('account').add({ email: email, password: password, fullname: fullname, birthday: birthday, contact: contact }),
          console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  getOne(email) {
    return this.firestore.collection('account').doc(email).valueChanges();
  }

  getOnePic(id) {
    return this.firestore.collection('accountImages').doc(id).valueChanges();
  }
  
  update(email: string, fullname: string, birthday: string, contact: string): Promise<any> {
    return this.firestore.collection('account').doc(email).update({ email: email, fullname: fullname, birthday: birthday, contact: contact })
      .then(value => {
        console.log('Auth service update worked: ');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  changePassword(email, password) {
    return this.firestore.collection('account').doc(email).update({ email: email, password: password });
  }

  delete(email) {
    let copyEmail = email;
    this.firestore.collection('account').doc(copyEmail).delete().then((data => {
      this.firebaseAuth.auth.currentUser.delete()
      console.log(data);
      console.log('Auth serviced called: ' + copyEmail);
    }))
  }

}
