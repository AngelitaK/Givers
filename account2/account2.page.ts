import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, ToastController, NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { firebaseConfig } from '../firebase.config';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { AuthService } from '../auth.service'

export interface MyData {
  email: string;
  name: any;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-account2',
  templateUrl: './account2.page.html',
  styleUrls: ['./account2.page.scss'],
})
export class Account2Page implements OnInit {
  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details
  fileName: any;
  fileSize: number;

  //Status check 
  isUploading: boolean;
  isUploaded: boolean;
  check: boolean = false;

  progress: any;  // Observable 0 to 100

  image: string; // base64
  captureDataUrl: string;

  public static URL;
  imgURL;
  selectedPhoto;
  public static loading;

  users: any = []
  single: any = []
  myForm: FormGroup;

  id: string = "";
  onepicture: any = [];
  picture: any = {};
  picEmail: string = ""

  email: string = ""
  password: string = ""
  fullname: string = ""
  basefullname: string = ""
  birthday: string = ""
  basebirthday: string = ""
  contact: string = ""
  basecontact: string = ""

  constructor(public fAuth: AngularFireAuth, public firestore: AngularFirestore, private storage: AngularFireStorage, private authService: AuthService,
    private googlePlus: GooglePlus, public router: Router, private toastCtrl: ToastController, public alertCtrl: AlertController,
    public navCtrl: NavController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public camera: Camera) {

    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
    this.myForm = formBuilder.group({
      'email': ['', Validators.required],
      'fullname': ['', Validators.required],
      'birthday': ['', Validators.required],
      'contact': ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });
    this.isUploading = false;
    this.isUploaded = false;
  }

  ngOnInit() {
    this.fAuth.authState.subscribe(user => {
      if (user != null) {
        this.email = user.email;
        this.firestore.collection('account').doc(this.email).valueChanges().subscribe((data) => {
          this.users = data;
          console.log(this.users)
        });
      }
    });
  }

  capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      allowEdit: true,
      targetHeight: 500,
      targetWidth: 500
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      console.log('Captured URL' + ' = ' + this.captureDataUrl);
    },
      (err) => {
        console.log(err);
      });
  }

  takeImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      // destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      allowEdit: true,
      targetHeight: 500,
      targetWidth: 500
    }
    this.camera.getPicture(options).then((imageData) => {
      this.selectedPhoto = 'data:image/jpeg;base64,' + imageData;
      console.log('url' + ' = ' + this.selectedPhoto);
    },
      (err) => {
        console.log('Error: ' + err);
      });
  }

  async upload() {
    const useremail = this.users.email;
    const filename = Math.floor(Date.now() / 1000);
    this.fileName = filename;
    console.log('filename' + this.fileName );
    const path = `accountStorage/${new Date().getTime()}_${filename}`;
    const fileRef = this.storage.ref(path);
    console.log('fileref' + fileRef);

    Account2Page.loading = await this.loadingCtrl.create({
      message: 'Uploading Image, Pleas Wait...'
    });
    await Account2Page.loading.present();

    if (this.selectedPhoto) {
      var uploadtask = firebase.storage().ref().child(`accountStorage/${new Date().getTime()}_${filename}`)
        .put(this.selectedPhoto);
      uploadtask.then(this.onSuccess, this.onError);
      console.log(uploadtask);

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            email: useremail,
            name: filename,
            filepath: resp,
            size: this.fileSize
          });
          console.log(this.UploadedFileURL);
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      })
    }
  }
  onSuccess = snapshot => {
    snapshot.ref.getDownloadURL().then(function (downloadURL) {
      Account2Page.URL = downloadURL;
      Account2Page.loading.dismiss();
    });
    this.imgURL = Account2Page.URL;
  };
  onError = error => {
    console.log('error', error)
  };

  uploadFile(event: FileList) {
    // The File object
    const file = event.item(0)
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    const useremail = this.users.email;
    // The storage path
    const path = `accountStorage/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'Givers' };
    //File reference
    const fileRef = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            email: useremail,
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          console.log(this.UploadedFileURL);
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      }))
  }

  addImagetoDB(image: MyData) {
    const id = this.users.email;
    this.firestore.collection('account').doc(id).update(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
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

  async update() {
    this.basefullname = this.users.fullname;
    this.basecontact = this.users.basecontact;
    this.basebirthday = this.users.basebirthday;
    //this from the form
    const formfullname = this.myForm.value.fullname;
    const formbirthday = this.myForm.value.birthday;
    const formcontact = this.myForm.value.contact;
    var finalfullname;
    var finalbirthday;
    var finalcontact;

    if (formfullname === "") {
      finalfullname = this.basefullname
    } else {
      finalfullname = formfullname
    }
    if (formbirthday === "") {
      finalbirthday = this.basebirthday
    } else {
      finalbirthday = formbirthday
    }
    if (formcontact === "") {
      finalcontact = this.basecontact
    } else {
      finalcontact = formcontact
    }

    if (formfullname === finalfullname && formbirthday === finalbirthday && formcontact === finalcontact) {
      const res = await this.authService.update(this.users.email, finalfullname, finalbirthday, finalcontact)
      const alert = await this.alertCtrl.create({
        message: 'Account updated!',
        buttons: [{
          text: 'OK',
          role: 'cancel',
        }]
      });
      await alert.present();
      console.log("account updated!");
    }
    else {
      const toast = await this.toastCtrl.create({
        message: 'Error Updating Message',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
      toast.onDidDismiss().then((val) => {
        console.log('error updating account');
      });
    }
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Your old password..',
          type: 'password'
        },
        {
          name: 'newPassword',
          placeholder: 'Your new password..',
          type: 'password'
        },
        {
          name: 'newPasswordConfirm',
          placeholder: 'Confirm your new password..',
          type: 'password'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', },
        {
          text: 'Update Password',
          handler: data => {
            const cpUser = firebase.auth().currentUser;
            const credentials = firebase.auth.EmailAuthProvider.credential(cpUser.email, data.oldPassword);
            const r = this.authService.changePassword(cpUser.email, data.newPassword);
            //Reauthenticating here with the data above
            cpUser.reauthenticateWithCredential(credentials).then(
              success => {
                if (data.newPassword != data.newPasswordConfirm) {
                  let alert = this.alertCtrl.create({
                    header: 'Change Password Failed',
                    message: 'You did not confirm your password correctly.',
                    buttons: ['Try Again']
                  })
                    .then(alert => alert.present());
                }
                else if (data.newPassword.length < 6) {
                  let alert = this.alertCtrl.create({
                    header: 'Change Password Failed',
                    message: 'Your password should be at least 6 characters long',
                    buttons: ['Try Again']
                  })
                    .then(alert => alert.present());
                }
                else {
                  let alert = this.alertCtrl.create({
                    header: 'Change Password Success',
                    message: 'Your password has been updated!',
                    buttons: ['OK']
                  })
                    .then(alert => alert.present());
                  cpUser.updatePassword(data.newPassword).then(function () {
                  })
                    .catch(function (error) {
                    });
                }
              },
              error => {
                console.log(error);
                if (error.code === "auth/wrong-password") {
                  let alert = this.alertCtrl.create({
                    header: 'Change Password Failed',
                    message: 'Your old password is invalid.',
                    buttons: ['Try Again']
                  })
                    .then(alert => alert.present());
                }
              })
              .then()
            console.log(cpUser);
          }
        }]
    })
      .then(alert => alert.present());
  }

  delete() {
    console.log(' Delete function called');
    const alert = this.alertCtrl.create({
      header: 'Delete This Account?',
      message: 'Are you sure you want to delete this account? The action is irreversible and will results in data deletion.',
      buttons: [
        {
          text: 'Yes',
          handler: (alertData) => {
            this.firestore.collection('account').doc(this.email).delete().then((data) => {
              this.fAuth.auth.currentUser.delete()
              console.log('account deleted: ' + this.email);
              this.firestore.collection('accountImages').doc(this.email).delete().then(async (data) => {
                console.log('images deleted');
              })
              this.router.navigate(['login']);
            })
              .catch(err => {
                console.log('Something went wrong:', err.message);
              })
          }
        },
        { text: 'No', role: 'cancel' }
      ]
    })
      .then(alert => alert.present());
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message
      })
      .then(toastData => toastData.present());
  }

}
