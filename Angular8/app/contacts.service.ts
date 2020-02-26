import { Injectable } from "@angular/core";
import { contact } from "./contact.model";
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({providedIn:"root"})
export class ContactsService{

    constructor(private http: HttpClient){}
  
    storeContacts (name:string, contactNumber: number){
  const contactData: contact = {
    Name:name,
    phonenumber: contactNumber
  }
  console.log(contactData);
  return this.http.post("http://localhost:3000/phonebook",
contactData);
    }


    
fetchContacts(){ 
return  this.http.get('http://localhost:3000/phonebook?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22Name%22%3A%20true%2C%0A%20%20%20%20%22phonenumber%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D')
  .pipe(map(response=>{
const contactsArray = [];
for (const key in response){
  if (response.hasOwnProperty(key)){
  contactsArray.push({...response[key],id:key});
}}
return contactsArray
} 
  ))

}

OnDeleteOneContact(folderName:string){
  const singlePAth='http://localhost:3000/phonebook/'+ folderName  ;
  console.log(singlePAth);
  return this.http.delete(singlePAth);
 }

 
onUpdateContact(folderName:string, name:string, phonenumber:string){
  const singlePAth='http://localhost:3000/phonebook/' + folderName ;
console.log(singlePAth);
return this.http.put(singlePAth,{
  Name: name,
  phonenumber: phonenumber})
}
}