import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the ApprPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appr',
  templateUrl: 'appr.html',
})
export class ApprPage {

  data : any = {};
  myDate : any;
  response : any;
  schedule : any;
  resID : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public toastCtrl: ToastController,
    public loadingCtrl : LoadingController , private http : Http, private screenOrientation: ScreenOrientation) 
    {
     // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.myDate = "";
      this.response = "";
      this.http = http;
      this.schedule = "";  
      this.resID = "";
    }

  
    dropSchedule(id : string){
      console.log("I am here");
      console.log(id);
       var apiURL = "http://132.148.23.19/ionphp/drop1.php";
    //  var apiURL = "http://localhost/ionphp/approve.php";


      // var apiURL = "http://132.148.23.19/ionphp/drop.php"; 132.148.23.19

      const loading = this.loadingCtrl.create({
        content: 'Processing Please Wait...',
        spinner : 'bubbles'
      });

      loading.present().then(()=>{

        this.http.post(apiURL, id)
        .subscribe(dataRes => {
        
              console.log("YES");
              this.response = dataRes["_body"];
              console.log(JSON.parse(this.response));
              var results = JSON.parse(this.response);
              
              if( results == "none")
              {
                loading.dismiss();
                console.log("No schedule yet") ;
                let loader = this.loadingCtrl.create({
                  spinner: 'bubbles',
                  content: "No Engagements Available ...",
                  duration: 5000
                });
                loader.present();
              }   
       
              else{ 
                this.schedule = results;

                loading.dismiss();
  
                let toast = this.toastCtrl.create({
                  message: 'Schedule Dropped successfully',
                  duration: 3000,
                  position: 'bottom'
                });
        
                toast.present();
              }
  
             
  
            }, error => {
              console.log("Oooops!");

              loading.dismiss();
                let toast = this.toastCtrl.create({
                message: 'Check your network connection...',
                duration: 3000,
                position: 'bottom'
              });
      
              toast.present();
           
            });

      }); 

      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1500);
         
     

    }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprPage');
    //var apiURL = "http://localhost/ionphp/allschedule.php";
     var apiURL = "http://132.148.23.19/ionphp/allschedule.php";
    console.log(" inside ion view ");

    var myDate1 = new Date();  

    console.log(myDate1);
     var myDates = JSON.stringify(this.myDate);

     const loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...',
      spinner : 'bubbles'
    });


    loading.present().then(()=>{  

      this.http.post(apiURL, myDate1)
      .subscribe(dataRes => {
         
          console.log("YES");
            this.response = dataRes["_body"];
            console.log(JSON.parse(this.response));
            var results = JSON.parse(this.response);

            if( results == "none")
            {
              loading.dismiss();
              console.log("No schedule yet") ;
              let loader = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: "No schedule yet...",
                duration: 5000
              });
              loader.present();
            }   

            else{

                this.schedule = results;               

               setTimeout(() => {
                loading.dismiss();
              }, 2000);

            }

          }, error => {
            console.log("Oooops!");

            loading.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Error: Check your network connection...',
              duration: 3000,
              position: 'bottom' 
            });

            toast.present();
          });


    });

  }

  compareStatus(stat : string){
   // console.log(stat);
    if (stat == "APPROVED"){
      return true;
    }
  }
    
  pushPage(){
   // console.log("button clicked");
    this.navCtrl.push(HomePage);
  }

}
