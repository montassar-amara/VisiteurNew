import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-site',
  templateUrl: './generic-site.component.html',
  styleUrls: ['./generic-site.component.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonicModule, CommonModule,TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GenericSiteComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  
}
