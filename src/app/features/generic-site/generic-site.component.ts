import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, Signal, effect } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generic-site',
  templateUrl: './generic-site.component.html',
  styleUrls: ['./generic-site.component.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonicModule, CommonModule,TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GenericSiteComponent  implements OnInit {
  @Input() data!:Signal<any>
  imagebaseUrl = environment.siteurl
  constructor() {
  }

  ngOnInit() {}

}
