import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wordnum' })
export class WordNumPipe implements PipeTransform {
  transform(value: number, one: string, twoToFour: string, FiveToNine: string) {
    if (value === 1) {
      return one;
    } else if (value % 10 === 0 || value % 9 === 0 || value % 8 === 0 || value % 7 === 0 || value % 6 === 0) {
      return FiveToNine;
    } else if (value % 2 === 0 || value % 3 === 0 || value % 4 === 0) {
      return twoToFour;
    } else {
      return FiveToNine;
    }
  }
}