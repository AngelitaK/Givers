import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  email: string;
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, public formBuilder: FormBuilder, 
    private alertCtrl: AlertController, private toastCtrl: ToastController, private menu: MenuController) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  async resetPassword() {

    const email = this.myForm.value.email;

    try {
      await this.authService.resetPassword(email);
      const alert = await this.alertCtrl.create({
        message: 'Check your inbox for the password reset link',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('login');
            }
          }
        ]
      });
      await alert.present();
    }
    catch (err) {
      console.log("RESET PASSWORD ERROR");
      console.dir(err);
      const toast = await this.toastCtrl.create({
        message: 'Please enter a valid email',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
      toast.onDidDismiss().then((val) => {
        console.log('Toast Dismissed');
      });
    }
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
   }
}
