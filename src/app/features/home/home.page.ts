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
import { environment } from 'src/environments/environment';
import { FileTypePipe } from 'src/app/shared/pipes/file-type.pipe';
import { Router } from '@angular/router';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    ScannerComponent,FileTypePipe, TranslateModule],
})
export class HomePage implements OnInit {
  #apiService = inject(ApiService)
  intro$ = this.#apiService.intro$
  imagebaseUrl = environment.baseUrlIntro
  playing = false
  paused = false
  scanResult=""
  ShowScanner=false
  constructor( public translate: TranslateService) {

  }
  
  

  ngOnInit() {
    this.#apiService.getIntro()
    this.translate.setDefaultLang('fr')

  }
  cancel(){
    this.playing = false;
    TextToSpeech.stop()
  }
  start(){  
    const html = document.getElementById('tts') as HTMLElement
    const text = html.textContent || html.innerText || ""
    const lang = this.#apiService.lang$()
    TextToSpeech.speak({
      text,
      lang: lang==='fr'?'fr-FR':(lang==='ar'?'ar':'en-US'),
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    })
    // the player will start immediatly, and resolve when it ends, so .then => done speaking

    this.playing = true;
  }
  pause() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        this.paused = true; 
        TextToSpeech.stop()
    } else {
        speechSynthesis.resume();
        TextToSpeech.speak
    }
}
  startScanner(){

  }
  cancelScan(){}
  confirmScan(){}
  scanSuccessHandler(eve:any){}
}
