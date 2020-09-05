import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  users: any = []
  email: string = ""
  fullname: string = ""

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController) {
    this.initializeApp();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email
        this.firestore.collection('account').doc(this.email).valueChanges().subscribe((data) => { this.users = data; });
      }
      else {
        console.log("not yet")
      }
    })
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //the main is from menuId in app.component.html
  close() {
    this.menuController.close("main");
  }
}
