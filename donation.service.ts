import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private firestore: AngularFirestore) { }

  getAll() {
    return this.firestore.collection('payment').valueChanges({ idField: 'id' });
  }
  getOne(id) {
    return this.firestore.collection('payment').doc(id).valueChanges();
  }
  add(fullname, Address, Postal, campaignName, charityName, Amount, PaymentMethod, CardName, CardNo, Cvc, Expiry, Message) {
    return this.firestore.collection('payment').add({
      fullname: fullname, 
      Address: Address,
      Postal: Postal,
      campaignName: campaignName,
      charityName: charityName,
      Amount: Amount,
      PaymentMethod: PaymentMethod, 
      CardName: CardName, 
      CardNo: CardNo, 
      Cvc: Cvc, 
      Expiry: Expiry, 
      Message: Message
    });
  }
  
}
