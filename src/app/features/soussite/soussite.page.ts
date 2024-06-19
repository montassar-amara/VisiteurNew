import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-soussite',
  templateUrl: './soussite.page.html',
  styleUrls: ['./soussite.page.scss'],
  standalone: true,
  imports: [CommonModule,GenericSiteComponent]
})
export class SoussitePage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.scanResult()
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

    return rawData
  })

  constructor(private apiService: ApiService) {
   }

  ngOnInit() {
  }

}
