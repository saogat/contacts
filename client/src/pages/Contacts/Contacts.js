import React, { Component } from "react";
import JobsContainer from "../../components/Grid/JobsContainer.js";
import { Table, Form, Container, Button } from "semantic-ui-react";
import FooterDiv from "../../components/Footer/Footer.js";
// import TechnologyDropDown from "../../components/TechnologyDropDown/TechnologyDropDown.js";
import API from "../../utils/API.js";

class ContactsPage extends Component {

//===================================================
//Initialize state
  state = {
    contacts: [],
    charsCounts: [],
    duplicateEmails: []
  };

  componentDidMount() {
    this.handleGetContacts();
    console.log("componentDidMount");    
  }

  calculateCharacterCount = () => {
    var emails = this.state.contacts.map(e => e.email);
    var charsMap = new Map();
    var sorted = [];
    emails.forEach(email => {
      var charsArray = email.split("");
      charsArray.forEach(char => {
        var charAsUpperCase = char.toUpperCase();
        if(charsMap.get(charAsUpperCase)){
          charsMap.set(charAsUpperCase,  charsMap.get(charAsUpperCase) + 1);
        }
        else{
          charsMap.set(charAsUpperCase, 1);
        }
      });
    })

    var counts = Array.from(charsMap.values());
    var sortedCounts = counts.sort(((a, b) => {
        if (a < b) return 1;
        else if(a > b) return -1;
        else return 0;
      }));
    console.log(sortedCounts);
    sortedCounts.forEach(e => {
      for (var [key, value] of charsMap.entries()) {
        if(e == value)
        sorted.push({char: key, count: value})
      }
    })
    
    this.setState({ charsCounts: sorted });
  }

  compareMaps(map1, map2) {
    var testVal;
    if (map1.size !== map2.size) {
        return false;
    }
    for (var [key, val] of map1) {
        testVal = map2.get(key);
        if (testVal !== val || (testVal === undefined && !map2.has(key))) {
            return false;
        }
    }
    return true;
  }

  calculateDuplicates = () => {
    var emails = this.state.contacts.map(e => e.email);
    var emailCharCounts = [];
    emails.forEach(email => {
      var chars = new Map();
      var parts = email.split("@");
      var charsArray = parts[0].split("");
      charsArray.forEach(char => {
        var charAsUpperCase = char.toUpperCase();
        if(chars.get(charAsUpperCase)){
          chars.set(charAsUpperCase, (chars.get(charAsUpperCase) + 1));
        }
        else{
          chars.set(charAsUpperCase, 1);
        }
      });
      emailCharCounts.push({email: email, chars: chars});
    });

    while(emailCharCounts.length > 1){
      var emailCharObj = emailCharCounts.pop();
      var emailCharCount = emailCharObj.chars;
      var found = emailCharCounts.find(e => {
          return this.compareMaps(e.chars, emailCharCount);
      });
      if(found){
          dups.push(found.email);
          dups.push(emailCharObj.email);
        } 
    }
    if(dups.length == 0) alert("No email duplicates found!");
    else this.state.duplicateEmails = dups;
  }

//===================================================
// GetContacts Functions
  handleGetContacts = () => {
    API.getContacts()
      .then(
        res => {
          this.setState({ contacts: res.data });
        })
      .catch(err => console.log(err));
  };

//===================================================
// Display contacts Table
  contactsTable = () => (
    <Table
      celled
      className="ui unstackable table"
      style={{
        width: "80%",
        align: "center",
        margin: "auto",
        marginTop: "15px"
      }}
    >
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell colSpan='3'>
       <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}> Contacts</h2></Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell width={2}>Name</Table.HeaderCell>
          <Table.HeaderCell width={6}>Email</Table.HeaderCell>
          <Table.HeaderCell width={6}>Title</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.state.contacts.length ? (
          this.state.contacts.map(contact => (
            <Table.Row>
              <Table.Cell>
              <Table.Cell>{contact.name}</Table.Cell>
              </Table.Cell>
              <Table.Cell>{contact.email}</Table.Cell>
              <Table.Cell>{contact.title}</Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row />
        )}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3" />
        </Table.Row>
      </Table.Footer>
    </Table>
  );

//===================================================
// Display email char counts Table
charsCountTable = () => (
  <Table
    celled
    className="ui unstackable table"
    style={{
      width: "80%",
      align: "center",
      margin: "auto",
      marginTop: "15px"
    }}
  >
    <Table.Header>
    <Table.Row>
    <Table.HeaderCell colSpan='3'>
     <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}> Email Char Count</h2></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell width={2}>Character</Table.HeaderCell>
        <Table.HeaderCell width={2}>Count</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {this.state.charsCounts.length ? (
         this.state.charsCounts.map(charsCount => (
          <Table.Row>
            <Table.Cell>{charsCount.char}</Table.Cell>
            <Table.Cell>{charsCount.count}</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row />
      )}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3" />
      </Table.Row>
    </Table.Footer>
  </Table>
);


//===================================================
// Display duplicate emails Table
dupsTable = () => (
  <Table
    celled
    className="ui unstackable table"
    style={{
      width: "80%",
      align: "center",
      margin: "auto",
      marginTop: "15px"
    }}
  >
    <Table.Header>
    <Table.Row>
    <Table.HeaderCell colSpan='1'>
     <h2 style={{padding: "0px", marginTop: "0px", marginBottom: "0px"}}>Duplicate Emails</h2></Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell width={10}>Email</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {this.state.duplicateEmails.length ? (
         this.state.duplicateEmails.map(e => (
          <Table.Row>
            <Table.Cell>{e}</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row />
      )}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="1" />
      </Table.Row>
    </Table.Footer>
  </Table>
);



//===================================================
// Render ContactsPage component
  render() {
    return (
      <div>
        <Container  style={{bottomBorder: "2px"}} className="ui fluid vertical left aligned segment massive" >
        <Form style={{ marginTop: "70px", marginLeft: "30px"}}>
          <Button
            style={{ marginLeft: "20px", marginTop: "10px" }}
            className="large blue"
            type="submit"
            onClick={this.calculateCharacterCount}>
            Email Character Count
          </Button>

          <Button
            style={{ marginLeft: "20px", marginTop: "10px" }}
            className="large blue"
            type="submit"
            onClick={this.calculateDuplicates}>
            Duplicates
          </Button>
        </Form>{" "}
        </Container>
        <this.dupsTable />
        <this.charsCountTable />
        <this.contactsTable />
      </div>
    );
  }
}

export default ContactsPage;
