import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
  standalone: true,
  imports: [ CommonModule,GenericSiteComponent]
})
export class LocalPage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.localData()
    if(!rawData || !rawData.local || !rawData.local.length){
      return rawData;
    }
    rawData.location = {description:"",shortdescription:"",name:""}
    const lang = this.apiService.lang$()
    if(lang==='ar'){
      rawData.location['description']=rawData.local[0]['ar_description']
      rawData.location['shortdescription']=rawData.local[0]['ar_short']
      rawData.location.name = rawData.local[0].ar_name
    }else if(lang === 'fr'){
      rawData.location['description']=rawData.local[0]['description']
      rawData.location['shortdescription']=rawData.local[0]['short_description']
      rawData.location.name = rawData.local[0].name
    }else{
      rawData.location['description']=rawData.local[0]['an_description']
      rawData.location['shortdescription']=rawData.local[0]['an_short']
      rawData.location.name = rawData.local[0].an_name
    }
    rawData.childname="sous local"
    rawData.enfants=rawData.souslocal.map((ss:any)=>{
      return ({
        ...ss,
        cover:ss.image_cover?(environment.localurl+ss.image_cover):'../../../assets/placeholder.png',
        name:(lang==='fr')?ss.name:((lang==='ar'?ss.ar_name:ss.an_name) ?? ss.name)
      })
    })
    rawData.attachement.map((att:any,index:number)=>{
      rawData.attachement[index].cover = att.link?(environment.localurl+att.link):'../../../assets/placeholder.png'
    })
    return rawData
  })
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  handleRequest(item:any){
    this.apiService.fetchScan(item.reference)
  }

}
