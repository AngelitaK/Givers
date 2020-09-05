import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import {NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      return new Promise((resolve, reject) => {
      this.afAuth.user.subscribe((user) => {
        if(user){
          resolve(true);
        }
        else{
          this.navCtrl.navigateRoot(['']);
          resolve(false);
        }
      })
    })
  }
  
}
