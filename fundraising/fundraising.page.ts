import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { first } from 'rxjs/operators';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-fundraising',
  templateUrl: './fundraising.page.html',
  styleUrls: ['./fundraising.page.scss'],
})
export class FundraisingPage implements OnInit {

  categories: any = [];

  constructor(public afAuth: AngularFireAuth, private authService: AuthService, public afstore: AngularFirestore,
    private orgService: OrganizationService) {
    orgService.getFundraising().subscribe((data) => { this.categories = data; });
  }

  ngOnInit() {
  }

}
