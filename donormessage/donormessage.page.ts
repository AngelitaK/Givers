import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { AlertController } from '@ionic/angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-donormessage',
  templateUrl: './donormessage.page.html',
  styleUrls: ['./donormessage.page.scss'],
})
export class DonormessagePage implements OnInit {

  messages: any = [];

  users: any = []
  email: string = ""

  constructor(private messageService: MessageService, private alertControll: AlertController,
    public fAuth: AngularFireAuth, public firestore: AngularFirestore, private authService: AuthService) {
     messageService.getAll().subscribe((data) => { this.messages = data; });
   }

  ngOnInit() {
    this.fAuth.authState.subscribe(user => {
      if (user) this.email = user.email
      this.firestore.collection('account').doc(this.email).valueChanges().subscribe((data) => { this.users = data; });
    })
  }

}
