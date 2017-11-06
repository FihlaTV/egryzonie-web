import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortUrl' })
export class ShortUrlPipe implements PipeTransform {
  transform(value: string) {
    value = value.charAt(value.length - 1) === '/' ? value.slice(0, value.length - 1) : value;
    return value
      .replace('http://', '')
      .replace('www.', '');
  }
}