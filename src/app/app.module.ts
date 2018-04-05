import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 import { DatePickerModule } from 'ion-datepicker';
 import { DatePicker } from '@ionic-native/date-picker';
 import { HttpModule } from '@angular/http';
 import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApprPage } from '../pages/appr/appr';

@NgModule({
  declarations: [
    MyApp,
    HomePage, ApprPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp), 
    DatePickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, ApprPage
  ],
  providers: [
    StatusBar,
    SplashScreen, DatePicker, ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
