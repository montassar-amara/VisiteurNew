import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent {
  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('ar'); 

  }
  changeLanguage(language: string) {
    this.translate.use(language);
}

}