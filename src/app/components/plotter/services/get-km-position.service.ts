import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetKmPositionService {

  constructor() { }

  getKMPosition(kmDate) {
    const plotMonth: number = kmDate.date.month;
    const plotYear: number = kmDate.date.year;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (
      new Date(kmDate.date.year, kmDate.date.month - 1, kmDate.date.day) >=
        currentDate &&
      new Date(kmDate.date.year, kmDate.date.month - 1, kmDate.date.day) <=
        new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 28)
    ) {
      let differenceBwMonths;

      if (currentMonth <= plotMonth && currentYear === plotYear) {
        differenceBwMonths = Math.abs(currentMonth - plotMonth);
      } else {
        differenceBwMonths = plotMonth + (12 - currentMonth);
      }
      if (currentYear === plotYear) {
        return differenceBwMonths * 60;
      } else {
        return differenceBwMonths * 60;
      }
    } else {
      return -1;
    }
  }

}
