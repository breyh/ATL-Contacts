import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { Phone } from 'src/app/interfaces/phone';
import { ContactService } from 'src/app/services/contact.service';
import { PhonesService } from 'src/app/services/phones.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  contact: any;
  phone_input: string = '';
  newContact!: string;
  selectedAll: boolean = false;
  selected_contacts: Contact[] = [];
  phones: Phone[] = [];
  total_phones: number = 0;
  show_newPhone = false;
  error: string = '';

  constructor(private contactService: ContactService, private phoneService: PhonesService) {
    this.List();
  }


  add() {
    if (this.newContact == '' || this.newContact == null) {
      this.error = 'Cant be empty';
    } else {
      this.contactService.add(this.newContact);
      this.newContact = '';
      this.error = '';
    }
  }

  List() {
    this.contacts = this.contactService.List();
  }
  setSelected() {
    setTimeout(() => {
      this.selected_contacts = this.contacts.filter(c => c.selected == true)
      if (this.contacts.some(c => c.selected == false)) {
        this.selectedAll = false;
      } else {
        this.selectedAll = true;
      }
    }, 100);
  }
  setSelectedAll() {
    this.selectedAll = !this.selectedAll;
    this.contacts.map(c => c.selected = this.selectedAll);
    this.setSelected();
  }
  removeSelection() {
    this.contactService.removeSelection(this.selected_contacts);
    this.List();
    this.selected_contacts = [];
    this.getPhones();
  }
  getPhones() {
    this.phones = this.phoneService.List();
    this.total_phones = this.phones.length;
    if (this.contact != null) {
      this.phones = this.phones.filter(a => a.contact_id == this.contact.id)
    }
  }
  getContact(id: number) {
    this.contact = this.contacts.find(c => c.id == id);
    this.getPhones();
  }
  addPhone() {
    if (this.phone_input != "") {
      this.phoneService.add(this.phone_input, this.contact.id);
      this.phone_input = '';
      this.List();
    } else {
      console.log("error...");
    }
    this.getPhones();
  }
  removeContact(id: number) {
    this.contactService.Delete(id);
    this.List();
    this.contact = null;
    this.getPhones();
  }
  searchContact(contact: string) {
    this.List();
    if (contact != "") {
      this.contacts = this.contacts.filter(c => c.name.toLowerCase().includes(contact.toLowerCase()))
    }
  }
  removePhone(id: number) {
    this.phoneService.Delete(id);
    this.getPhones();
  }
  ngOnInit(): void {
  }

}
