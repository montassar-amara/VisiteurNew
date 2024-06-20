import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-souslocal',
  templateUrl: './souslocal.page.html',
  styleUrls: ['./souslocal.page.scss'],
  standalone: true,
  imports: [CommonModule,GenericSiteComponent]
})
export class SouslocalPage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.sousLocalData ()
    if(!rawData || !rawData.souslocal || !rawData.souslocal.length){
      return rawData;
    }
    rawData.location = {description:"",shortdescription:"",name:""}
    const lang = this.apiService.lang$()
    if(lang==='ar'){
      rawData.location['description']=rawData.souslocal[0]['ar_description']
      rawData.location['shortdescription']=rawData.souslocal[0]['ar_short']
      rawData.location.name = rawData.souslocal[0].ar_name
    }else if(lang === 'fr'){
      rawData.location['description']=rawData.souslocal[0]['description']
      rawData.location['shortdescription']=rawData.souslocal[0]['short_description']
      rawData.location.name = rawData.souslocal[0].name
    }else{
      rawData.location['description']=rawData.souslocal[0]['an_description']
      rawData.location['shortdescription']=rawData.souslocal[0]['an_short']
      rawData.location.name = rawData.souslocal[0].an_name
    }
    rawData.childname="objet"
    rawData.enfants=rawData.immo.map((ss:any)=>{
      return ({
        ...ss,
        cover:ss.image_cover?(environment.immourl+ss.image_cover):'../../../assets/placeholder.png',
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

}
