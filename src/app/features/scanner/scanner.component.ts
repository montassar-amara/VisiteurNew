import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner'
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  standalone:true,
  imports:[ZXingScannerModule]
})
export class ScannerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
