import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsService } from './contacts.service';
import { contact } from './contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'thinkCloud-task';
  @ViewChild('contactSubmit', {static: false})  contactSubmit : NgForm ;
  loadedContacts : contact[] = [];
  contactID: string;
  contactName:string;
  contactNumber:string;
  isUpdated = false;
  numberExist=false;
  contactSuccess=false;
searchName=true;
searchMessage=""
  constructor(private contactsService: ContactsService){}
  ngOnInit() {
this.fetchMyProducts();
  }

  onSubmit(contactSubmit: NgForm){
    console.log(contactSubmit.value);
    const name = this.contactSubmit.value.name;
    const phoneNumber = this.contactSubmit.value.mobileNumber;
    this.numberSearch(contactSubmit);
    if( this.searchName == false){
      this.numberExist=false;
      this.contactSuccess=true;
this.contactsService.storeContacts(name,phoneNumber).subscribe(resData =>{
  console.log(resData);
} );}
else{
  this.numberExist=true;
  this.contactSuccess=false;
}

this.contactSubmit.reset();
this.fetchMyProducts();
  }

  fetchMyProducts(){
    this.contactsService.fetchContacts().
    subscribe(contacts =>{
      console.log(contacts);
      this.loadedContacts= contacts;
  });
}

deleteContact(id:string){
  this.contactID =  id;
    console.log(this.contactID);
      this.contactsService.OnDeleteOneContact(this.contactID).subscribe(contacts=>{
        console.log(contacts);
        this.loadedContacts= [];
        this.fetchMyProducts();
  })
}
updateContact(name:string, numbers:string, id:string){
  this.isUpdated=true;
console.log(name,numbers,id);
this.contactID=id;
this.contactName=name;
this.contactNumber=numbers;

}
closeForm(){
  this.isUpdated=false;
}
UpdateContact(contactUpdate: NgForm){
  this.isUpdated=true
  console.log(contactUpdate.value);
  const contact= contactUpdate.value.name;
  const phoneNumber = contactUpdate.value.mobileNumber;
  const id = contactUpdate.value.id;
  this.contactID =id; ;  
  console.log(this.contactID);
  this.contactsService.onUpdateContact(this.contactID,contact,phoneNumber)
  .subscribe(Response=>{
    console.log(Response);
  })
  
  this.isUpdated=false;
  this.loadedContacts= [];
  this.fetchMyProducts();
  }

  nameSearch(searchByName:NgForm){
console.log(searchByName.value.searchName);
let nameSearch:string =searchByName.value.searchName;
let searchResult= null;
  for (let item of this.loadedContacts){
  console.log(false);
  this.searchName=false;
  if (nameSearch === item.Name ) {
    console.log(true);
    this.searchName=true;
    searchResult = item ;
    console.log(searchResult);
    this.contactName=item.Name;
    this.contactNumber= item.phonenumber.toString();
    console.log(this.contactName, this.contactNumber);
    return true;
  }
this.searchMessage= " not found";
console.log(this.searchMessage);
 
  }
}

numberSearch(searchByNumber:NgForm){
  console.log(searchByNumber.value.mobileNumber);
  let numberSearch:string =searchByNumber.value.mobileNumber;
  let searchResult= null;
    for (let item of this.loadedContacts){
    console.log(false);
    this.searchName=false;
    if (numberSearch === item.phonenumber.toString() ) {
      console.log(true);
      this.searchName=true;
      searchResult = item ;
      console.log(searchResult);
      this.contactName=item.Name;
      this.contactNumber= item.phonenumber.toString();
      console.log(this.contactName, this.contactNumber);
      return true;
    }
  this.searchMessage= " not found";
  console.log(this.searchMessage);
   
    }
  }
}