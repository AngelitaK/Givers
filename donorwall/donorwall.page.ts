import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../message.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-donorwall',
  templateUrl: './donorwall.page.html',
  styleUrls: ['./donorwall.page.scss'],
})
export class DonorwallPage implements OnInit {

  users: any = []
  id: string = ""
  email: string = ""
  fullname: string = ""
  message: string = ""
  basemessage: string = ""
  single: any = []

  public myForm: FormGroup;

  constructor(private afAuth: AngularFireAuth, public firestore: AngularFirestore, public authService: AuthService,
    private messageService: MessageService, public alertController: AlertController, private toastCtrl: ToastController,
    public formBuilder: FormBuilder, public router: Router) {

    this.myForm = formBuilder.group({
      fullname: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) this.email = user.email
      this.firestore.collection('account').doc(this.email).valueChanges().subscribe((data) => { this.users = data; });
    })
  }

  async add() {
    const fullname = this.myForm.value.fullname;
    const useremail = this.users.email;
    const formmessage = this.myForm.value.message;

    this.basemessage = this.single.message;
    var finalmessage;

    if (formmessage === "") {
      finalmessage = this.basemessage
    } else {
      finalmessage = formmessage
    }

    if (formmessage === finalmessage) {
      const res = await this.messageService.add(fullname, finalmessage, useremail)
      const alert = await this.alertController.create({
        message: 'Message Added!',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.router.navigate(['donormessage']);
            }
          }
        ]
      });
      await alert.present();
      console.log("message added");
    }
    else {
      const toast = await this.toastCtrl.create({
        message: 'Error adding message',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
    }
  }
}



