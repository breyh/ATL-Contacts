import { Injectable } from '@angular/core';
import { PhonesService } from './phones.service';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  Contacts: Contact[] = [];
  constructor(private phonesService: PhonesService) {
    this.getNow();
    this.getData();
  }
  public getData() {
    let data = localStorage.getItem("Contacts");
    this.Contacts = data != null ? JSON.parse(data) : this.Contacts;
  }
  public List() {
    this.getData();
    return this.Contacts;
  }
  public add(Contact: string) {
    let condition = true;
    let randomNumber: number = 0;
    while (condition) {
      randomNumber = Math.floor(Math.random() * 1000000)
      condition = this.Contacts.some(Contact => Contact.id == randomNumber);
    }
    this.Contacts.push({ id: randomNumber, name: Contact, creation_date: this.getNow(), selected: false })
    localStorage.setItem("Contacts", JSON.stringify(this.Contacts));
  }
  public Delete(id: number) {
    this.Contacts = this.Contacts.filter(c => c.id != id);
    localStorage.setItem("Contacts", JSON.stringify(this.Contacts));
    this.phonesService.DeleteFromContact(id);
  }
  public getNow() {
    let currentdate = new Date();
    let datetime = + currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    return datetime
  }
  public removeSelection(Contacts: Contact[]) {
    Contacts.forEach(c => {
      this.Delete(c.id);
    })
  }

}
