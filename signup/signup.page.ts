import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../auth.service';

import { AlertController, NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;

  isTextFieldType: boolean;
  isTextFieldType2: boolean;

  single: any = []
  email: string = ""
  baseemail: string = ""

  password: string = ""
  basepassword: string = ""

  cpassword: string = ""
  basecpassword: string = ""

  fullname: string = ""
  basefullname: string = ""

  birthday: string = ""
  basebirthday: string = ""

  contact: string = ""
  basecontact: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    private authService: AuthService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private menu: MenuController,
    public formBuilder: FormBuilder,
    public router: Router) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      cpassword: ['', Validators.required],
      fullname: ['', Validators.required],
      birthday: ['', Validators.required],
      contact: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
  }

  ngOnInit() {
  }

  //password eye show password
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  togglePasswordFieldType2() {
    this.isTextFieldType2 = !this.isTextFieldType2;
  }

  async signup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const cpassword = this.signupForm.value.cpassword;
    const formfullname = this.signupForm.value.fullname;
    const formbirthday = this.signupForm.value.birthday;
    const formcontact = this.signupForm.value.contact;

    this.basefullname = this.single.fullname;
    this.basebirthday = this.single.basebirthday;
    this.basecontact = this.single.basecontact;

    var fullname;
    var birthday;
    var contact;

    if (formfullname === "") {
      fullname = this.basefullname
    } else {
      fullname = formfullname
    }

    if (formbirthday === "") {
      birthday = this.basebirthday
    } else {
      birthday = formbirthday
    }

    if (formcontact === "") {
      contact = this.basecontact
    } else {
      contact = formcontact
    }

    if (formfullname === fullname && formbirthday === birthday &&
      formcontact === contact) {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
          this.afstore.collection('account').doc(email).set({ email: email, password: password, fullname: fullname, birthday: birthday, contact: contact }),
            console.log(data);
        })
      const alert = await this.alertController.create({
        message: 'Sign up successful!',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/home'])
          }
        }]
      });
      await alert.present();
    }
    else {
      const toast = await this.toastCtrl.create({
        message: 'Error Signing Up: Please check that you have filled all the required information correctly.',
        animated: false,
        position: 'bottom',
        duration: 2000,

      });
      toast.present();
      console.log('fail :(');
    }
  }

  //hamburger menu disable swipe
  ionViewDidEnter() {
    this.menu.swipeGesture(false);
  }
  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

}
