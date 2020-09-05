import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { OrganizationService } from '../organization.service';
import { first } from 'rxjs/operators';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = ""
  fullname: string = ""
  users: any = []

  public categories: any[];

  constructor(public afAuth: AngularFireAuth, private authService: AuthService, public afstore: AngularFirestore,
    private orgService: OrganizationService, private toastCtrl: ToastController) {

    orgService.getCategory().subscribe((data) => { this.categories = data; });
    //search
    orgService.getAll().subscribe((data) => { this.categories = data; });
  }

  async ngOnInit() {
    this.categories = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const categories = await this.afstore.collection('home').valueChanges().pipe(first()).toPromise();
    return categories;
  }
  async filterList(evt) {
    this.categories = await this.initializeItems();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.categories = this.categories.filter(currentSearch => {
      if (currentSearch.org && searchTerm) {
        return (currentSearch.org.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

}
