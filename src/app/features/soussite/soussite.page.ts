import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-soussite',
  templateUrl: './soussite.page.html',
  styleUrls: ['./soussite.page.scss'],
  standalone: true,
  imports: [CommonModule,GenericSiteComponent]
})
export class SoussitePage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.sousSiteData()
    if(!rawData || !rawData?.soussite || !rawData?.soussite?.length){
      return rawData;
    }
    rawData.location = {description:"",shortdescription:"",name:""}
    const lang = this.apiService.lang$()
    if(lang==='ar'){
      rawData.location['description']=rawData.soussite[0]['ardescription']
      rawData.location['shortdescription']=rawData.soussite[0]['arshortdescription']
      rawData.location.name = rawData.soussite[0].arsite
    }else if(lang === 'fr'){
      rawData.location['description']=rawData.soussite[0]['description']
      rawData.location['shortdescription']=rawData.soussite[0]['short_description']
      rawData.location.name = rawData.soussite[0].name
    }else{
      rawData.location['description']=rawData.soussite[0]['andescription']
      rawData.location['shortdescription']=rawData.soussite[0]['anshortdescription']
      rawData.location.name = rawData.soussite[0].ansite
    }
    rawData.childname="local"
    rawData.enfants=rawData.local.map((ss:any)=>{
      return ({
        ...ss,
        cover:ss.image_cover?(environment.localurl+ss.image_cover):'../../../assets/placeholder.png',
        name:(lang==='fr')?ss.name:((lang==='ar'?ss.ar_name:ss.an_name) ?? ss.name)
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
    this.apiService.fetchScan(item.reference)
  }

}
