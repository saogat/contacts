import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import API from "../../utils/API";
import TechnologyDropDown from "../../components/TechnologyDropDown/TechnologyDropDown.js";

class AccomplishmentForm extends Component {

    state = {
        accomplishment: "",
        url: "",
        modalOpen: false ,
        technologySelected: ""
      };
        
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });  
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    setTechnologySelected = (data) => {
        this.setState({
          technologySelected: data
        });
      }
  
    handleFormSubmit = event => {
       // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      console.log("Submit clicked");
      if (this.state.accomplishment) {
        API.addAccomplishment({
          userId: window.sessionStorage.getItem("user_id"),
          technologyId: this.state.technologySelected,
          accomplishment:
          {
            description: this.state.accomplishment,
            url: this.state.url,
          }})
          .then()
          .catch(err => alert(err));
          this.props.close();
      }
    };
    render() {
        return (
          <div>

      <Form>   
      <Form.Field>
      <label>Project</label>
      <input 
          placeholder='Project App' 
          value={this.state.accomplishment}
          onChange={this.handleInputChange}
          name="accomplishment"/>
      </Form.Field>
      <Form.Field>
      <label>Link to project</label>
      <input 
          placeholder='//http:'  
          value={this.state.url}
          onChange={this.handleInputChange}
          name="url"/>
      </Form.Field>
      <Form.Field>
      <TechnologyDropDown  setTechnologySelected={(data) => this.setTechnologySelected(data)}/>
      </Form.Field>
      <Button className="blue large floated right" style={{marginBottom: "20px"}}
        type='submit'      
        // disabled={!(this.state.accomplishment)}
        onClick={this.handleFormSubmit}>
        Add
      </Button>
     
      </Form>
      </div>
   )}
}

    

export default AccomplishmentForm


