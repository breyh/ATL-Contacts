import { Injectable } from '@angular/core';
import { Phone } from '../interfaces/phone';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  phones: Phone[] = [];
  constructor() {
    this.getData();
  }
  public getData() {
    let data: any = localStorage.getItem("phones");
    this.phones = data != null ? JSON.parse(data) : this.phones;
  }
  public List() {
    this.getData();
    return this.phones;
  }
  public add(phone: string, contact_id: number) {
    let condition = true;
    let randomNumber: number = 0;
    while (condition) {
      randomNumber = Math.floor(Math.random() * 1000000)
      condition = this.phones.some(phone => phone.id == randomNumber);
    }
    this.phones.push({ id: randomNumber, contact_id: contact_id, number: phone })
    localStorage.setItem("phones", JSON.stringify(this.phones));
  }
  public Search(txt: string) {

  }
  public Edit(id: number) {

  }
  public Delete(id: number) {
    this.phones = this.phones.filter(c => c.id != id);
    localStorage.setItem("phones", JSON.stringify(this.phones));
  }
  public DeleteFromContact(id: number) {
    this.phones = this.phones.filter(c => c.contact_id != id);
    localStorage.setItem("phones", JSON.stringify(this.phones));
  }
}
