import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonText } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
  imagebaseUrl: string = environment.baseUrl;
  SettingApp:any;
  logo: string='';
  imagesIntro:{
    slides:any[];
    folder:string
  }={
    slides:[],folder:''
  }
  @ViewChild('swiper') swiperRef!: any;

 animationInProgress = false;
  config = {
    slidesPerView: 1,
    spaceBetween: 1,
    pagination: true,
    loop: true,
  }
  constructor(private ApiService: ApiService, private loadingCtrl: LoadingController,private router: Router,private translationconfig: TranslateService) { }

  ngOnInit() {
    this.loadSetting();

    // this.ApiService.getIntro().subscribe(console.log)
  }
  async loadSetting(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
      });
      await loading.present();
    this.ApiService.getIntroImages().subscribe(res=>{
      this.imagesIntro = res;
      console.log(res)
    })
    this.ApiService.getSetting().subscribe(
      (res:any) => {
      loading.dismiss();
       this.SettingApp=res;
       this.logo=this.imagebaseUrl+ this.SettingApp.setting.logo;

        event?.target.complete();

      },
      (err:any) => {
        console.log(err);

      }
    );
  }
  setLanguage(lang:string){
    this.translationconfig.use(lang);
    this.ApiService.lang$.set(lang)
    this.router.navigate(['home'])
   }



}
