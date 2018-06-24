import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  APIInterceptor,
  AuthGuard,
  ClinxBuyNowComponent,
  ClinxCartPageComponent,
  ClinxContactPageComponent,
  ClinxLoginComponent, ClinxPaymentReturnPageComponent,
  ClinxSaleListPageComponent,
  ClinxSalePageComponent,
  ClinxSignUpComponent, ClinxWebLibraryComponent, ClinxWebLibraryModule
} from 'clinx-web-library';

const routes: Routes = [
  {path: 'sales/:page', component: ClinxSaleListPageComponent},
  {path: 'sale/:id', component: ClinxSalePageComponent},
  {path: 'login', component: ClinxLoginComponent},
  {path: 'contact-us', component: ClinxContactPageComponent},
  {path: 'sign-up', component: ClinxSignUpComponent},
  {path: 'cart', component: ClinxCartPageComponent},
  {path: 'buyNow', component: ClinxBuyNowComponent, canActivate: [AuthGuard]},
  {path: 'paymentReturn', component: ClinxPaymentReturnPageComponent, canActivate: [AuthGuard]},
  {path: 'paymentReturn.html', component: ClinxPaymentReturnPageComponent, canActivate: [AuthGuard]},
  {path: '', component: ClinxWebLibraryComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClinxWebLibraryModule.forRoot({
      website_name: 'Optibiz',
      company_logo: 'assets/Clinx_Circle_Large_NBlur.png',
      image_404: 'assets/404.jpg',
      company_id: 123,
      enable_buy: true,
      session: {
        key_prefix: 'BASE_TEST'
      },
      urls: environment.urls
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
