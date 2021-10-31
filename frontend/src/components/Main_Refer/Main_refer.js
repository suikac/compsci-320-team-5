import React, {Component} from "react";

class referal extends Component{
  constructor(props){
    this.state = {refereeName: "", currentEmployee:null,
      toEmail: "", resume:null, description: ""}
    //add positionID: number from job posting
  }
  handleSubmit(event){
    alert('Form Submitted');
    event.preventDefault();
  }
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name

    this.setState({
      [name]: value
    });
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Current Employee:
          <select value={this.state.currentEmployee}
                  onChange={this.handleInputChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            //make optional
            //add ID box
          </select>
        </label>
        <label>
          Name:
          <input type="text" value={this.state.refereeName}
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Email:
          <input type="email" value={this.state.toEmail}
                 onChange={this.handleChange}/>
        </label>
        <label>
          Resume:
          <input type="file" value={this.state.resume}
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Reason for Referal:
          <textarea value={this.state.description}
                    onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="submit"/>
      </form>
    )}
}
