import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filetype',
  standalone: true
})
export class FileTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
