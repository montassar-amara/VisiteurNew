import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, Signal, effect } from '@angular/core';
import { IonButton, IonContent,IonButtons,IonBackButton,IonCard,IonCardHeader,IonCardTitle } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-generic-site',
  templateUrl: './generic-site.component.html',
  styleUrls: ['./generic-site.component.scss'],
  standalone: true,
  imports: [IonButton,IonButtons, IonContent, IonicModule, CommonModule,TranslateModule, ImageModule,IonCard,IonCardHeader,IonCardTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GenericSiteComponent  implements OnInit {
  @Input() data!:Signal<any>
  @Output() request = new EventEmitter<any>()
  lang = this.apiService.lang$
  constructor(private apiService:ApiService) {
  }

  ngOnInit() {}
  loadLocation(item:any){
    this.request.emit(item)
  }
  back(){
    history.back()
  }
}
