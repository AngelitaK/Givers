import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { first } from 'rxjs/operators';

//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-animal',
  templateUrl: './animal.page.html',
  styleUrls: ['./animal.page.scss'],
})
export class AnimalPage implements OnInit {
  categories: any = [];

  constructor(public afAuth: AngularFireAuth, private authService: AuthService, public afstore: AngularFirestore,
    private orgService: OrganizationService) {
    orgService.getAnimal().subscribe((data) => { this.categories = data; });
  }

  ngOnInit() {
  }

}
