import { Component } from "react";
import { ContactForm } from "./Components/ContactForm";
import { ContactList } from "./Components/ContactList";
import { Filter } from "./Components/Filter";
export class App extends Component{
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }
  handleContact = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    console.log(this.state.contacts);
    
    if (this.state.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      form.reset();
      return;
    }
      const contact = {
        id: crypto.randomUUID(),
        name: name,
        number:number,
      }
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact]
      }))
      form.reset()
    }
  handleFilter = e => {
    const filter = e.currentTarget.value;
    this.setState({filter})
  }
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }
  render() {
    const { contacts, filter } = this.state;
    
    const filteredList = contacts.filter(contact => (
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ))
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleContact={this.handleContact} />
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter}/>
        <ContactList contacts={filteredList} onDelete={this.handleDelete}/>
      </div>
    )
  }
}