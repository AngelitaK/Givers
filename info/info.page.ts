import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OrganizationService } from '../organization.service';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  category: any = [];
  id: string = ""
  cId: string = ""

  constructor( public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    private authService: AuthService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private orgService: OrganizationService,
    public activatedRoute: ActivatedRoute,
    public router: Router) {}

  ngOnInit() {
    // Get the id that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.cId = this.activatedRoute.snapshot.paramMap.get('category');

    // Retrieve Elderly information
    this.orgService. getOneElderly(id).subscribe(result => {
     
      if (result != null) { this.category= result; this.category.id = id;}
    });

    //Retrieve migrant worker information
    this.orgService.getOneMigrant(id).subscribe(result => {
      if (result != null) { this.category= result; this.category.id = id;}
    });

     //Retrieve children information
     this.orgService.getOneChildren(id).subscribe(result => {
      if (result != null) { this.category= result; this.category.id = id;}
    });

     //Retrieve individual fundraising information
     this.orgService.getOneFundraising(id).subscribe(result => {
      if (result != null) { this.category= result; this.category.id = id;}
    });

     //Retrieve animal welfare information
     this.orgService.getOneAnimal(id).subscribe(result => {
      if (result != null) { this.category= result; this.category.id = id;}
    });

     //Retrieve disability information
     this.orgService.getOneDisability(id).subscribe(result => {
      if (result != null) { this.category= result; this.category.id = id;}
    });
  }


}
