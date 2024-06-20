import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Signal } from '@angular/core';
import { IonButton, IonContent,IonButtons,IonCard,IonCardHeader,IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
import { ApiService } from 'src/app/shared/services/api.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-generic-site',
  templateUrl: './generic-site.component.html',
  styleUrls: ['./generic-site.component.scss'],
  standalone: true,
  imports: [IonButton,IonButtons, IonContent, CommonModule,TranslateModule, ImageModule,IonCard,IonCardHeader,IonCardTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GenericSiteComponent implements OnInit, OnDestroy{
  @Input() data!:Signal<any>
  @Output() request = new EventEmitter<any>()
  lang = this.apiService.lang$
  playing = false
  paused = false
  constructor(private apiService:ApiService) {
  }
  ngOnDestroy(): void {
    TextToSpeech.stop()
  }

  ngOnInit() {}
  loadLocation(item:any){
    this.request.emit(item)
  }
  back(){
    history.back()
  }
  cancel(){
    this.playing = false;
    TextToSpeech.stop()
  }
  start(){
    const html = document.getElementById('tts') as HTMLElement
    const text = html.textContent || html.innerText || ""
    const lang = this.apiService.lang$()
    TextToSpeech.speak({
      text,
      lang: lang==='fr'?'fr':(lang==='ar'?'ar':'en-US'),
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
}
