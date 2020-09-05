import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { DonationService } from '../donation.service';
import { OrganizationService } from '../organization.service';
import { Router, ActivatedRoute } from '@angular/router';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  users: any = []
  email: string = ""

  category: any = [];
  id: string = ""
  cId: string = ""

  maxData: any = (new Date()).getFullYear() + 10;
  minDate: string = new Date().toISOString();
  paymentMethods: any = ['VISA', 'AMEX', 'MASTERCARD', 'UOB', 'CITI', 'MAYBANK', 'DBS']

  public myForm: FormGroup;
  single: any = []

  Address: string = ""
  baseAddress: string = ""

  Postal: string = ""
  basePostal: string = ""

  campaignName: string = ""
  basecampaignName: string = ""

  charityName: string = ""
  basecharityName: string = ""

  Amount: number
  baseAmount: number
  
  fullname: string = ""
  basefullname: string = ""

  CardName: string = ""
  baseCardName: string = ""

  CardNo: string = ""
  baseCardNo: string = ""

  Cvc: number
  baseCvc: number

  Expiry: string = ""
  baseExpiry: string = ""

  PaymentMethod: string = ""
  basePaymentMethod: string = ""

  Message: string = ""
  baseMessage: string = ""

  constructor(
    public afAuth: AngularFireAuth, public afstore: AngularFirestore, private authService: AuthService,
    public alertController: AlertController, private toastCtrl: ToastController, public formBuilder: FormBuilder,
    private donationService: DonationService, private orgService: OrganizationService, public activatedRoute: ActivatedRoute, public router: Router) {

    this.myForm = formBuilder.group({
      fullname: ['', Validators.required],
      Address: ['', Validators.required],
      Postal: ['', Validators.required],
      campaignName: ['', Validators.required],
      charityName: ['', Validators.required],
      Amount: ['', Validators.required],
      PaymentMethod: ['', Validators.required],
      CardName: ['', Validators.required],
      CardNo: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(19), Validators.required])],
      Cvc: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(3), Validators.required])],
      Expiry: ['', Validators.required],
      Message: ''
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) this.email = user.email
      this.afstore.collection('account').doc(this.email).valueChanges().subscribe((data) => { this.users = data; });
    })

    this.cId = this.activatedRoute.snapshot.paramMap.get('category');
    console.log(this.cId);    
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.orgService.getOneCat(this.cId, id).subscribe(result => {
      if (result != null) { 
      this.category= result;}
    });
  }

  async add() {

    const fullname = this.myForm.value.fullname;
    const formAddress = this.myForm.value.Address;
    const formPostal = this.myForm.value.Postal;
    const campaignName = this.myForm.value.campaignName;
    const charityName = this.myForm.value.charityName;
    const formAmount = this.myForm.value.Amount;
    const formPaymentMethod = this.myForm.value.PaymentMethod;
    const formCardName = this.myForm.value.CardName;
    const formCardNo = this.myForm.value.CardNo;
    const formCvc = this.myForm.value.Cvc;
    const formExpiry = this.myForm.value.Expiry;
    const Message = this.myForm.value.Message;

    this.basefullname = this.single.fullname;
    this.baseAddress = this.single.baseAddress;
    this.basePostal = this.single.basePostal;
    this.basecampaignName = this.single.basecampaignName;
    this.basecharityName = this.single.basecharityName;
    this.baseAmount = this.single.baseAmount;
    this.basePaymentMethod = this.single.basePaymentMethod;
    this.baseCardName = this.single.baseCardName;
    this.baseCardNo = this.single.baseCardNo;
    this.baseCvc = this.single.baseCvc;
    this.baseExpiry = this.single.baseExpiry;
    this.baseMessage = this.single.baseMessage;

    var finalAddress;
    var finalPostal;
    var finalAmount;
    var finalPaymentMethod;
    var finalCardName;
    var finalCardNo;
    var finalCvc;
    var finalExpiry;

    if (formAddress === "") {
      finalAddress = this.baseAddress
    } else {
      finalAddress = formAddress
    }

    if (formPostal === "") {
      finalPostal = this.basePostal
    } else {
      finalPostal = formPostal
    }
    
    if (formAmount === "") {
      finalAmount = this.baseAmount
    } else {
      finalAmount = formAmount
    }
    
    if (formPaymentMethod === "") {
      finalPaymentMethod = this.basePaymentMethod
    } else {
      finalPaymentMethod = formPaymentMethod
    }
    if (formCardName === "") {
      finalCardName = this.baseCardName
    } else {
      finalCardName = formCardName
    }

    if (formCardNo === "") {
      finalCardNo = this.baseCardNo
    } else {
      finalCardNo = formCardNo
    }

    if (formCvc === "") {
      finalCvc = this.baseCvc
    } else {
      finalCvc = formCvc
    }

    if (formExpiry === "") {
      finalExpiry = this.baseExpiry
    } else {
      finalExpiry = formExpiry
    }

    if (formAddress === finalAddress && 
      formPostal === finalPostal && 
      formAmount === finalAmount && 
      formPaymentMethod === finalPaymentMethod &&
      formCardName === finalCardName && 
      formCardNo === finalCardNo && 
      formCvc === finalCvc && 
      formExpiry === finalExpiry) {

      const res = await this.donationService.add(
        fullname, 
        finalAddress, 
        finalPostal,
        this.category.campaignName,
        this.category.charityName,
        finalAmount, 
        finalPaymentMethod, 
        finalCardName, 
        finalCardNo,
        finalCvc, 
        finalExpiry, 
        Message
      )

      const alert = await this.alertController.create({
        message: 'Donation Successfull! Thank you for donating!',
        buttons: [
          {
            text: 'Ok',
            handler: () => { this.router.navigate(['history']);}
          }
        ]
      });
      await alert.present();
    }
    else {
      const toast = await this.toastCtrl.create({
        message: 'Error donating. Please try again.',
        animated: false,
        position: 'bottom',
        duration: 2000,
      });
      toast.present();
      toast.onDidDismiss().then((val) => {
      });
    }
  }

}
