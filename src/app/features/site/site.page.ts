import { Component, OnInit, Signal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';

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
    rawData.enfants=rawData.soussite
    return rawData
  })

  constructor(private apiService: ApiService) {
   }

  ngOnInit() {
  }

}
