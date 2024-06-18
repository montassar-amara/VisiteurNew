import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  sanitiser = inject(DomSanitizer)
  lang$ = signal('ar')
  intro$ = signal<any>(undefined)
  sites$ = new BehaviorSubject<any[]>([])
  getIntro(){
    this.http.get<any>(environment.apiUrl+'/Introbylang?lang='+ this.lang$())
    .pipe(take(1))
    .subscribe((res:{intro:any[],attachement:any[]})=>{
      this.intro$.set({attachement:res.attachement,description:this.sanitiser.bypassSecurityTrustHtml(res.intro[0].description),shortDesc:res.intro[0].shortdescription,rtl:false});
    })
  }
  // async getSites(){
  //   if(this.sites$.getValue().length>0){
  //     return this.sites$
  //   }else{
  //     const res = await lastValueFrom(this.getSiteByPager(1,20))
  //     this.sites$.next(res)
  //     return this.sites$
  //   }
  // }
}
