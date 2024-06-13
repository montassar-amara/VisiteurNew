import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  sanitiser = inject(DomSanitizer)
  lang$ = signal('fr')
  intro$ = signal<any>(undefined)
  getIntro(){
    this.http.get<any>(environment.apiUrl+'/Introbylang')
    .pipe(take(1))
    .subscribe((res:{intro:any[],attachement:any[]})=>{
        const lang = this.lang$()
        switch(lang){
          case 'fr':
            this.intro$.set({attachement:res.attachement.filter(att=>att.langue==='#fr'),description:this.sanitiser.bypassSecurityTrustHtml(res.intro[0].description),shortDesc:res.intro[0].shortdescription,rtl:false});break;
          case 'ar':res.intro[0].description
            this.intro$.set({attachement:res.attachement.filter(att=>att.langue==='#ar'),description:this.sanitiser.bypassSecurityTrustHtml(res.intro[0].ar_description),shortDesc:res.intro[0].ar_shortdescription,rtl:true});break;
            default: // default 'en'res.intro[0].description
            this.intro$.set({attachement:res.attachement.filter(att=>att.langue==='#an'),description:this.sanitiser.bypassSecurityTrustHtml(res.intro[0].an_description),shortDesc:res.intro[0].an_shortdescription,rtl:false});break;
        }
    })
  }
}
