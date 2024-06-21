import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

import { IonContent, IonHeader, IonTitle, IonToolbar,
   IonFab, IonFabButton, IonIcon, IonButtons,
   IonRow,IonCol,IonImg,IonCard,IonButton,IonItem,
   IonCardContent,
   } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { FileTypePipe } from 'src/app/shared/pipes/file-type.pipe';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner, GoogleBarcodeScannerModuleInstallState } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import {Html5QrcodeScanner} from "html5-qrcode";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonFab,IonFabButton,IonIcon, IonButtons,
    IonRow,IonCol,IonImg,IonCard,IonButton,IonItem,IonCardContent,
    CommonModule, FormsModule,
    FileTypePipe, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage implements OnInit, OnDestroy {
  #apiService = inject(ApiService)
  #router = inject(Router)
  intro$ = this.#apiService.intro$
  imagebaseUrl = environment.audioconverted
  siteMap = this.#apiService.siteMap
  playing = false
  paused = false
  lang = this.#apiService.lang$;
  eff = effect(()=>{
    const res = this.#apiService.scanResult()
    if(res){
      if(res.site){
        this.#apiService.siteData.set(res)
        this.#router.navigate(['site'])
      }
      // else if(res.soussite){
      //   this.#apiService.sousSiteData.set(res)
      //   this.#router.navigate(['soussite'])
      // }
      else if(res.local){
        this.#apiService.localData.set(res)
        this.#router.navigate(['local'])
      }
      // else if(res.souslocal){
      //   this.#apiService.sousLocalData.set(res)
      //   this.#router.navigate(['souslocal'])
      // }
      else{
        console.log(res)
      }
    }
  },{allowSignalWrites:true})
  constructor( public translate: TranslateService,private alertController: AlertController) {
  }



  ngOnInit() {
    this.#apiService.scanResult.set(undefined)
    this.#apiService.getIntro()
    this.#apiService.getMap()

  }
  cancel(){
    this.playing = false;
    const audio = (document.getElementById('audio') as HTMLAudioElement)
    if(audio){
      audio.currentTime=0
      audio.pause()
    }
    const html = document.getElementById('tts') as HTMLElement
     if(html){
      const text = html.textContent || html.innerText || ""
      const lang = this.#apiService.lang$()
      TextToSpeech.speak({
        text,
        lang: lang==='fr'?'fr':(lang==='ar'?'ar':'en-US'),
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',

      })
      this.playing = true;
     }
  }
  start(){
    if(this.intro$() && this.intro$()?.attachement_audio && this.intro$()?.attachement_audio?.length){
      const audio = (document.getElementById('audio') as HTMLAudioElement)
      if(audio){
        audio.play()
      }
    }else{
      const html = document.getElementById('tts') as HTMLElement
      const text = html.textContent || html.innerText || ""
      const lang = this.#apiService.lang$()
      TextToSpeech.speak({
        text,
        lang: lang==='fr'?'fr':(lang==='ar'?'ar':'en-US'),
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      })
    }
    // the player will start immediatly, and resolve when it ends, so .then => done speaking

    this.playing = true;
  }
  pause() {
    const audio = (document.getElementById('audio') as HTMLAudioElement)

    if(audio && (audio.paused || audio.played)){
        if(audio.paused){
          audio.play()
        }else{
          audio.pause()
        }
    }else{
      TextToSpeech.stop()
    }
}
  async scan(): Promise<void> {
    try{
      const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
      const {available} = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable()
    BarcodeScanner.addListener("googleBarcodeScannerModuleInstallProgress",async(res)=>{
        if(res.state===GoogleBarcodeScannerModuleInstallState.COMPLETED && res.progress===100){
          const {barcodes} = await BarcodeScanner.scan();
          if(this.siteMap()[barcodes[0].displayValue]){
            this.#apiService.fetchScan(barcodes[0].displayValue)
            BarcodeScanner.removeAllListeners()
            BarcodeScanner.stopScan()
          }
        }
    })
    if(!available){
      await BarcodeScanner.installGoogleBarcodeScannerModule()

    }else{
      const {barcodes} = await BarcodeScanner.scan();
      if(this.siteMap()[barcodes[0].displayValue]){
        this.#apiService.fetchScan(barcodes[0].displayValue)
        BarcodeScanner.removeAllListeners()
        BarcodeScanner.stopScan()
      }
    }
    }catch(err:any){
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
      html5QrcodeScanner.render(async(result:any)=>{
      if(this.siteMap()[result]){
        this.#apiService.fetchScan(result)
        await html5QrcodeScanner.clear();
      }else{
        console.error('invalid code')
      }
      }, undefined);
    }


  }
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  back(){
    this.intro$.set(undefined)
    this.#apiService.scanResult.set(undefined)
    this.#router.navigate(['home'])
  }
  ngOnDestroy(): void {

    TextToSpeech.stop()
    this.cancel()
  }
}
