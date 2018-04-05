import { Component, ViewChild } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ApprPage } from '../appr/appr';



//import { DatePickerDirective } from 'ion-datepicker';
//@ViewChild(DatePickerDirective) 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  data : any = {};
  myDate : any;
  response : any;
  schedule : any;
  resID : any;
  constructor(public navCtrl: NavController, private datePicker: DatePicker,
    public toastCtrl: ToastController, public loadingCtrl : LoadingController , private http : Http, 
    private screenOrientation: ScreenOrientation ) {
 
     // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.myDate = "";
      this.response = "";
      this.http = http;
      this.schedule = "";
      this.resID = "";

  }
  

    public checkSchedule(ddate : string){
    
      var apiURL = "http://132.148.23.19/ionphp/nondefault.php";

     // var apiURL = "http://localhost/ionphp/nondefault.php";

      if (this.myDate == "")
      {
        let loader = this.loadingCtrl.create({
          content: "No date selected ...",
          duration: 3000,
          spinner:'bubbles'
        });
        loader.present();
      }
      else{
    
         var myDates = JSON.stringify(ddate);
        //  var myDates = JSON.stringify(this.myDate);

        const loading = this.loadingCtrl.create({
          content: 'Processing Please Wait...',
          spinner : 'bubbles'
        });

        loading.present().then(()=>{
          this.http.post(apiURL, myDates)
            .subscribe(dataRes => {
               
                  this.response = dataRes["_body"];
                  console.log(JSON.parse(this.response));
                  var results = JSON.parse(this.response);

                  if( results == "none")
                  {
                      let toast = this.toastCtrl.create({
                      message: 'No Schedule Found for selected Date',
                      duration: 3000,
                      position: 'bottom'
                    });
            
                    toast.present();

                  }   

                  else{                 
                        this.schedule = results;

                        let toast = this.toastCtrl.create({
                          message: 'Schedule Loaded',
                          duration: 3000,
                          position: 'bottom'
                        });
                
                        toast.present();
                      }

                }, error => {
                 
                  let toast = this.toastCtrl.create({
                    message: 'Check Your Network Connection',
                    duration: 3000,
                    position: 'bottom'
                  });
          
                  toast.present();
                });

        }); // loading ctrl ends   
        loading.dismiss();   
      }  // end else condition part  

    }  // end function here
       


    pushPage(){
      //console.log("button clicked");
      const loading = this.loadingCtrl.create({
        content: 'Processing Please Wait...',
        spinner : 'bubbles'
      });
      loading.present().then(()=> {
        this.navCtrl.push(ApprPage);
      }); 
     loading.dismiss();
     
      
    }

    compareStatus(stat : string){
     // console.log(stat);
      if (stat == "APPROVED"){
        return true;
      }
    }

    compareStatus2(stat : string){
    //  console.log(stat);
      if (stat == "PENDING"){
        return true;
      }
    }

     compareStatus3(stat : string){
     // console.log(stat);
      if (stat == "REJECTED"){
        return true;
      }
    }

    dropSchedule(id : string){
     // console.log("I am here");
      //console.log(id);
     // var apiURL = "http://localhost/ionphp/drop.php";
      var apiURL = "http://132.148.23.19/ionphp/drop.php";

      const loading = this.loadingCtrl.create({
        content: 'Processing Please Wait...',
        spinner : 'bubbles'
      });

      loading.present().then(()=>{

        this.http.post(apiURL, id)
        .subscribe(dataRes => {
              this.response = dataRes["_body"];
              console.log(JSON.parse(this.response));
              var results = JSON.parse(this.response);
  
                 this.schedule = results;
  
                 loading.dismiss();

                 let toast = this.toastCtrl.create({
                  message: 'Schedule Dropped successfully',
                  duration: 3000,
                  position: 'bottom'
                });
        
                toast.present();
  
            }, error => {
             
              loading.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Check your network connection...',
                duration: 3000,
                position: 'bottom'
              });
      
              toast.present();
           
            });
      }); // finish loading
     // loading.dismiss();

    }  // end function


    appSchedule(id : string){
      //console.log("I am here in app schedule");
      //console.log(id);
      //var apiURL = "http://localhost/ionphp/approve.php";
       var apiURL = "http://132.148.23.19/ionphp/approve.php";

       const loading = this.loadingCtrl.create({
        content: 'Processing Please Wait...',
        spinner : 'bubbles'
      });
      loading.present().then(()=>{


        this.http.post(apiURL, id)
        .subscribe(dataRes => {
           
              this.response = dataRes["_body"];
              console.log(JSON.parse(this.response));
              var results = JSON.parse(this.response);
  
              this.schedule = results;
  
              loading.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Schedule Approved successfully',
                duration: 3000,
                position: 'bottom'
              });
      
              toast.present();
        
  
            }, error => {
             
              loading.dismiss();
                let toast = this.toastCtrl.create({
                message: 'Check your network connection...',
                duration: 3000,
                position: 'bottom'
              });
      
              toast.present();
           
            });

      });
      
      // loading.dismiss();   

    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad PgreadPage');

      // var apiURL = "http://132.148.23.19/ionphp/test1.php";   http://132.148.150.76
     //  var apiURL = "http://localhost/ionphp/default.php";
      var apiURL = "http://132.148.23.19/ionphp/default.php";
        //console.log(" inside ion view ");

        var myDate1 = new Date();  

        let loader = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: "Processing Data. Please Wait...",
          // duration: 2000
        });

        loader.present().then(()=>{

          var myDates = JSON.stringify(this.myDate);
          this.http.post(apiURL, myDate1)
              .subscribe(dataRes => {
  
                    this.response = dataRes["_body"];
                    console.log(JSON.parse(this.response));
                    var results = JSON.parse(this.response);
  
                    if( results == "none")
                    {
                      //console.log("No schedule yet") ;
                      loader.dismiss();

                      let loading = this.loadingCtrl.create({
                        spinner: 'hide',
                        content: "No schedule yet...",
                        duration: 3500
                      });
                      loading.present();

                    }   
  
                    else{
                     loader.dismiss();
  
                       this.schedule = results;

                       let toast = this.toastCtrl.create({
                        message: 'Schedule Loaded Successfully',
                        duration: 3000,
                        position: 'bottom'
                      });
              
                      toast.present();
  
                    }
  
                  }, error => {
                  
                    loader.dismiss();
                    let toast = this.toastCtrl.create({
                      message: 'Error: Check your network connection...',
                      duration: 3000,
                      position: 'bottom' 
                    });
  
                    toast.present();
   
                  });

                //    setTimeout(() => {  
                //   loader.dismiss();
                // }, 3000);
                  
        });
          

    }

}
