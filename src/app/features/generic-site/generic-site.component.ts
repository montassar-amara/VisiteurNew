import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Signal, ViewChild } from '@angular/core';
import { IonButton, IonContent,IonButtons,IonCard,IonCardHeader,IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule,Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
import { ApiService } from 'src/app/shared/services/api.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { environment } from 'src/environments/environment';

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
  imgUrl = environment.immourl
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  constructor(private apiService:ApiService,private location:Location) {
  }
  ngOnDestroy(): void {
    TextToSpeech.stop()
  }

  ngOnInit() {}
  loadLocation(item:any){
    TextToSpeech.stop()
    this.request.emit(item)
  }
  back(){
    this.location.back()
  }
  cancel(tts:any){
    this.playing = false;
    TextToSpeech.stop()
  }
  start(tts:any){
    const html = tts as HTMLElement
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
  pause(tts:any) {

  }
  handlePager(eve:any){
    const tmp = this.swiperRef?.nativeElement?.swiper.activeIndex
    if(tmp%10===7){
      this.apiService.loadMore(Math.ceil(tmp/10)+2)
    }
  }
}
