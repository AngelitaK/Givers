import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './auth.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'donorwall',
    loadChildren: () => import('./donorwall/donorwall.module').then( m => m.DonorwallPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'payment/:category/:id',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'donormessage',
    loadChildren: () => import('./donormessage/donormessage.module').then( m => m.DonormessagePageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'account2',
    loadChildren: () => import('./account2/account2.module').then( m => m.Account2PageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'elderly',
    loadChildren: () => import('./elderly/elderly.module').then( m => m.ElderlyPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'children',
    loadChildren: () => import('./children/children.module').then( m => m.ChildrenPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'disability',
    loadChildren: () => import('./disability/disability.module').then( m => m.DisabilityPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'migrant',
    loadChildren: () => import('./migrant/migrant.module').then( m => m.MigrantPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'animal',
    loadChildren: () => import('./animal/animal.module').then( m => m.AnimalPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'fundraising',
    loadChildren: () => import('./fundraising/fundraising.module').then( m => m.FundraisingPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'info/:category/:id',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule), canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
