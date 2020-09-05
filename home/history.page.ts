import { Component, OnInit } from '@angular/core';
import { DonationService } from '../donation.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  users: any = []
  email: string = ""
  fullname: string = ""
  paymentId: any = []

  donations: any = [];

  constructor(public fAuth: AngularFireAuth, public afstore: AngularFirestore, private googlePlus: GooglePlus,
              private donationService: DonationService, public router: Router) { 
      donationService.getAll().subscribe((data) => { this.donations = data; });
    }

  ngOnInit() {
    this.fAuth.authState.subscribe(user => {
      if (user) this.email = user.email
      this.afstore.collection('account').doc(this.email).valueChanges().subscribe((data) => { this.users = data; });
    })
  }

  logout() {
    this.fAuth.auth.signOut();
    console.log("Logout");
    this.router.navigate(['/login'])
    //google sign out
    this.googlePlus.disconnect()
      .then(user => {
        this.router.navigate(['/login'])
      })
      .catch(err => JSON.stringify(err).toString());
  }

}
