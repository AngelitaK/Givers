import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""
  fullname: string = ""

  isTextFieldType: boolean;

  constructor(private alertController: AlertController,
    private toastCtrl: ToastController,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    public afstore: AngularFirestore,
    private googlePlus: GooglePlus,
    public router: Router) {}

  ngOnInit() {
  }

  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  async login() {
    const { email, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      if (res) {
        console.log(res);
        const alert = await this.alertController.create({
          message: 'Login Successful!',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                this.router.navigateByUrl('home');
              }
            }
          ]
        });
        await alert.present();
      }
    }
    // If Error logging in
    catch (err) {
      console.dir(err);
      const toast = await this.toastCtrl.create({
        message: 'Error Logging In: Please check that you have entered the correct email and password.',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
    }
  }

  googleSignIn() {
    let params = {
      'webClientId': '742078714778-ak25rqupkjc5825cms3i21d6dljghja7.apps.googleusercontent.com',
      'offline': true
    }
    this.googlePlus.login(params)
      .then(user => {

        this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null));
        this.afstore.collection('account').doc(user.email).set({email: user.email, fullname: user.displayName});
        this.router.navigate(['/home']);
      })
      .catch(err => JSON.stringify(err).toString());
  }
  
  onLoginError(err) {
    console.log(err);
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
   }

}
