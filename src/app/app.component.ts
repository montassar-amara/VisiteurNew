import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, effect } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiService } from './shared/services/api.service';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent implements OnInit{
  constructor(public translate: TranslateService,private apiService:ApiService,private router:Router) {
    effect(()=>{
      const lang =this.apiService.lang$()
      this.translate.setDefaultLang(lang);
      const html = (document.getRootNode() as HTMLHtmlElement)
      html.lang = lang
      html.dir = lang==='ar'?'rtl':'ltr'
    })

  }
  ngOnInit() {
    this.router.navigate([''])
  }
  changeLanguage(language: string) {
    this.translate.use(language);
}

}
