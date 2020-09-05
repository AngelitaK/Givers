import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  message: any = {};

  public myForm: FormGroup;

  id: string = "";
  email: string = "";
  onemessage: any = {};
  check: boolean = false;

  single: any = []
  msg: string = ""
  basemsg: string = ""
  basefullname: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    private authService: AuthService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private messageService: MessageService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {

    this.myForm = formBuilder.group({
      fullname: ['', Validators.required],
      message: ['', Validators.required]
    });

    afAuth.authState.subscribe(checker => {
      if (checker) {
        var userEmail = checker.email
        var messageEmail = "";
        let msgId = this.activatedRoute.snapshot.paramMap.get('id');

        this.messageService.getOne(msgId).subscribe(result => {
          if(result != null){
            this.onemessage = result;
            messageEmail = this.onemessage.email;
            if (messageEmail === userEmail && userEmail != null && messageEmail != null) {
              this.check = true;
              console.log('check true: ' + userEmail + ' = ' + messageEmail);
            } else {
              this.check = false;
              console.log('check false: ' + userEmail + ' != ' + messageEmail);
            };
          }
        })
      } 
      else {
        console.log("details email not there")
      }
    })
  }

  ngOnInit() {
    // Get the id that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    // Retrieve the user information through userService
    this.messageService.getOne(id).subscribe(result => {
      if (result != null) { this.message= result; this.message.id = id;}
    });

  }

  async update() {
    const formfullname = this.myForm.value.fullname;
    const formmsg = this.myForm.value.message;

    this.basemsg = this.single.message;
    this.basefullname = this.single.fullname;

    var finalmsg;
    var finalfullname;

    if (formmsg === "") {
      finalmsg = this.basemsg
    } else {
      finalmsg = formmsg
    }

    if (formfullname === "") {
      finalfullname = this.basefullname
    } else {
      finalfullname= formfullname
    }

     if(formmsg === finalmsg && formfullname === finalfullname){
      const res = await this.messageService.update(this.message.id, this.message.email, finalfullname, finalmsg)
      const alert = await this.alertController.create({
        message: 'Message updated!',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/donormessage'])
          }
        }]
      });
      await alert.present();
      console.log("Message updated!");
    }
    else{
      const toast = await this.toastCtrl.create({
        message: 'Error Updating Message',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
      toast.onDidDismiss().then((val) => {
        console.log('error updating');
      });
    }
  }

  async delete() {
    const alert = await this.alertController.create({
      header: 'Delete This Message?',
      message: 'Are you sure you want to delete the record? This action is irreversible.',
      buttons: [
        {
          text: 'Yes',
          handler: (alertData) => { // Delete user through user service
            this.messageService.delete(this.message.id);
            this.router.navigate(['donorwall']);
          }
        },
        { text: 'No', role: 'cancel' }
      ]
    })
      .then(alert => alert.present());
  }

}
