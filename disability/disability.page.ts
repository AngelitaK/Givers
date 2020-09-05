import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.page.html',
  styleUrls: ['./disability.page.scss'],
})
export class DisabilityPage implements OnInit {

  categories: any = [];

  constructor(public afAuth: AngularFireAuth, private authService: AuthService, public afstore: AngularFirestore,
    private orgService: OrganizationService) {
    orgService.getDisability().subscribe((data) => { this.categories = data;  });
  }

  ngOnInit() {
  }

}
