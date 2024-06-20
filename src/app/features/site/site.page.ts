import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
  standalone: true,
  imports: [CommonModule, GenericSiteComponent]
})
export class SitePage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.scanResult()
    if(!rawData || !rawData.site || !rawData.site.length){
      return rawData;
    }
    rawData.location = {description:"",shortdescription:"",name:""}
    const lang = this.apiService.lang$()
    if(lang==='ar'){
      rawData.location['description']=rawData.site[0]['ardescription']
      rawData.location['shortdescription']=rawData.site[0]['arshortdescription']
      rawData.location.name = rawData.site[0].arsite
    }else if(lang === 'fr'){
      rawData.location['description']=rawData.site[0]['description']
      rawData.location['shortdescription']=rawData.site[0]['short_description']
      rawData.location.name = rawData.site[0].name
    }else{
      rawData.location['description']=rawData.site[0]['andescription']
      rawData.location['shortdescription']=rawData.site[0]['anshortdescription']
      rawData.location.name = rawData.site[0].ansite
    }
    rawData.childname="sous site"
    rawData.enfants=rawData.soussite.map((ss:any)=>{
      return ({
        ...ss,
        cover:ss.image_cover?(environment.siteurl+ss.image_cover):'../../../assets/placeholder.png',
        name:(lang==='fr')?ss.name:((lang==='ar'?ss.arsite:(ss.ansite)) ?? ss.name)
      })
    })
    rawData.attachement.map((att:any,index:number)=>{
      rawData.attachement[index].cover = att.link?(environment.siteurl+att.link):'../../../assets/placeholder.png'
    })
    return rawData
  })

  constructor(private apiService: ApiService) {
   }

  ngOnInit() {
  }
  handleRequest(item:any){
    this.apiService.fetchScan(item.refrence)
  }

}
