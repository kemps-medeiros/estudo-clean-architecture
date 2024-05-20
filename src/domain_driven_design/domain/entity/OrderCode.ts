export default class OrderCode {
    value: string;

  constructor(date: Date, sequentialNumber: number) {
    this.value = date.getFullYear() + sequentialNumber.toString().padStart(8, '0');
  }

}
