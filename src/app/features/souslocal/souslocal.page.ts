import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GenericSiteComponent } from '../generic-site/generic-site.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-souslocal',
  templateUrl: './souslocal.page.html',
  styleUrls: ['./souslocal.page.scss'],
  standalone: true,
  imports: [CommonModule,GenericSiteComponent]
})
export class SouslocalPage implements OnInit {
  data = computed<any>(()=>{
    const rawData = this.apiService.scanResult()
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

    return rawData
  })
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

}
