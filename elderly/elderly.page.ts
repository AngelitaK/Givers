import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { first } from 'rxjs/operators';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-elderly',
  templateUrl: './elderly.page.html',
  styleUrls: ['./elderly.page.scss'],
})
export class ElderlyPage implements OnInit {

  categories: any = [];

  constructor(public afAuth: AngularFireAuth, private authService: AuthService, public afstore: AngularFirestore,
    private orgService: OrganizationService) {
    orgService.getElderly().subscribe((data) => { this.categories = data; });
  }

  ngOnInit() {
  }

}
