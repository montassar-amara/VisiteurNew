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
  lang$ = signal('fr')
  settings$!:any;
  intro$ = signal<any>(undefined)
  scanResult = signal<any>(undefined)
  siteData = signal<any>(undefined)
  sousSiteData = signal<any>(undefined)
  localData = signal<any>(undefined)
  sousLocalData = signal<any>(undefined)
  lastRequest = signal<any>(undefined)
  siteMap = signal<any>(undefined) // {'01':site,...}
  getIntro(){
    this.http.get<any>(environment.apiUrl+'/Introbylang?lang='+ this.lang$())
    .pipe(take(1))
    .subscribe((res:{intro:any[],attachement:any[],attachement_audio:any[]})=>{
      this.intro$.set({attachement_audio:res.attachement_audio,attachement:res.attachement,description:this.sanitiser.bypassSecurityTrustHtml(res.intro[0].description),shortDesc:res.intro[0].shortdescription,rtl:false});
    })
  }
  fetchScan(qcode:string){
    this.http.get<any>(environment.apiUrl+`/getImmoByLang?qcode=${qcode}&lang=${this.lang$()}`).pipe(take(1)).subscribe((res:any)=>{
      this.scanResult.set(res)
      this.lastRequest.set(qcode)
    })
  }
  getMap(){
    this.http.get<any>(environment.apiUrl+`/Detailobject`).pipe(take(1)).subscribe((res:any)=>{
      if(res.access){
        const tmp = [
          ...res.sites.map((s:any)=>({...s,reference:s.refrence})),
          // ...res.soussites.map((s:any)=>({...s,reference:s.refrence})),
          ...res.local,
          // ...res.souslocal,
        ]
        const transformedObject = tmp.reduce((acc:any, current:any) => {
          acc[current.reference] = current.name;
          return acc;
        }, {});
      this.siteMap.set(transformedObject)
      }
    })
  }
  getIntroImages(){
    return this.http.get<any>(environment.apiUrl+'/Slides')
  }
  getSetting() {
    if(!this.settings$)
    this.settings$ = this.http.get(`${environment.apiUrl}/AppSetting`)
    return this.settings$;
  }
  loadMore(page:number){
    this.http.get<any>(environment.apiUrl+`/getImmoByLang?qcode=${this.lastRequest()}&lang=${this.lang$()}&page=${page}`).pipe(take(1)).subscribe((res:any)=>{
      const tmp = this.scanResult()
      this.scanResult.set({
        ...tmp,
        immo:[...tmp.immo,...res.immo]
      })
    })
  }
}
