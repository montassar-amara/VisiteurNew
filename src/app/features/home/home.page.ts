import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScannerComponent } from '../scanner/scanner.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { IonContent, IonHeader, IonTitle, IonToolbar,
   IonFab, IonFabButton, IonIcon, IonButtons,IonBackButton,
   IonRow,IonCol,IonImg,IonCard,IonButton,IonModal,IonItem,
   IonCardContent,
   } from '@ionic/angular/standalone';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { environment } from 'src/environments/environment';
import { FileTypePipe } from 'src/app/shared/pipes/file-type.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonFab,IonFabButton,IonIcon, IonButtons,
    IonRow,IonCol,IonImg,IonCard,IonButton,
    IonBackButton,IonModal,IonItem,IonCardContent,
    CommonModule, FormsModule,
    ScannerComponent, TranslatePipe,FileTypePipe]
})
export class HomePage implements OnInit {
  #apiService = inject(ApiService)
  intro$ = this.#apiService.intro$
  imagebaseUrl = environment.baseUrlIntro
  playing = false
  paused = false
  scanResult=""
  ShowScanner=false
  constructor() {

  }

  ngOnInit() {
    this.#apiService.getIntro()
  }
  cancel(){

  }
  start(){

  }
  pause(){

  }
  startScanner(){

  }
  cancelScan(){}
  confirmScan(){}
  scanSuccessHandler(eve:any){}
}
