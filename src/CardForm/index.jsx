import React, { Component } from 'react';
import './style.css'

class CardForm extends Component {
  constructor(){
    super()
    this.state = {
      fields: {
        'cardName': '',
        'cardNumber': '',
        'month': '',
        'year': '',
        'cvc': ''
      },
      errors: {
        'cardName': '',
        'cardNumber': '',
        'month': '',
        'year': '',
        'cvc': ''
      },
      formIsValid: false,
      message: ''
    }
  }
  handleChange(e) {
    let { fields, errors, formIsValid } = this.state
    let field = e.target.name
    let value = e.target.value
    let CURRENT_YEAR = 2019
    fields[field] = value
    this.setState({
      fields
    })

    // check cardName_ rule: only letters allowed
    if(fields["cardName"].length > 0) {
      if(!fields["cardName"].match(/^[a-zA-Z]*$/)) {
        errors["cardName"] = "Invalid Cardholder Name."
        formIsValid = false
      } else {
        errors["cardName"] = ""
        formIsValid = true
      }
    }
    // check cardNumber_ rule: must be 16 length
    if(fields["cardNumber"].length > 0) {
      if(fields["cardNumber"].length !== 16) {
        errors["cardNumber"] = "Invalid Cardh Number."
        formIsValid = false
      } else {
        errors["cardNumber"] = ""
        formIsValid = true
      }
    }
    if(fields["month"].length > 0) {
      if(fields["month"].length !== 2) {
        errors["month"] = "Invalid Month."
        formIsValid = false
      } else if(parseInt(fields["month"]) > 12){
        errors["month"] = "Invalid Month."
        formIsValid = false
      } else {
        errors["month"] = ""
        formIsValid = true
      }
    }
    if(fields["year"].length > 0) {
      if(fields["year"].length !== 4) {
        errors["year"] = "Invalid Year."
        formIsValid = false
      } else if(parseInt(fields["year"]) < CURRENT_YEAR){
        errors["year"] = "Invalid Year."
        formIsValid = false
      } else {
        errors["year"] = ""
        formIsValid = true
      }
    }
    if(fields["cvc"].length > 0) {
      if(fields["cvc"].length !== 3) {
        errors["cvc"] = "Invalid CVC."
        formIsValid = false
      } else {
        errors["cvc"] = ""
        formIsValid = true
      }
    }

    this.setState({
      formIsValid
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    if(this.state.formIsValid) {
      this.setState({
        message: 'Payment Successful!'
      })
    } else {
      this.setState({
        message: 'Payment Failed!'
      })
    }
  }
  render(){
    let { fields, errors, formIsValid, message } = this.state
    return(
      <div className="card-form-wrapper">
        <h1> Payment Validation </h1>
        <div className="card-form">
          <form id="card" onSubmit={(e)=>{this.handleSubmit(e)}}>
            <div className="form-group">
              <h3> Name on Card </h3>
              <input type="text"
                     id="cardName"
                     name="cardName"
                     placeholder="John Krane"
                     onChange={(e)=>{this.handleChange(e)}} />
              <span className={(errors['cardName'].length > 0 ? "withError" : "noError")}> {errors['cardName']} </span>
            </div>
            <div className="form-group">
              <h3> Card Number </h3>
              <input type="text"
                     id="cardNumber"
                     name="cardNumber"
                     placeholder="1234123412341234"
                     onChange={(e)=>{this.handleChange(e)}} />
              <span className={(errors['cardNumber'].length > 0 ? "withError" : "noError")}> {errors['cardNumber']} </span>
            </div>
            <div className="form-group">
              <h3> Date of Expiration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CW/CVC</h3>
              <input type="text"
                     id="month"
                     name="month"
                     placeholder="07"
                     onChange={(e)=>{this.handleChange(e)}} />
              <input type="text"
                     id="year"
                     name="year"
                     placeholder="2017"
                     onChange={(e)=>{this.handleChange(e)}} />
              <input type="text"
                     id="cvc"
                     name="cvc"
                     placeholder="123"
                     onChange={(e)=>{this.handleChange(e)}} />
              <span className={(errors['month'].length > 0 ? "withError" : "noError")}> {errors['month']} </span>
              <span className={(errors['year'].length > 0 ? "withError" : "noError")}> {errors['year']} </span>
              <span className={(errors['cvc'].length > 0 ? "withError" : "noError")}> {errors['cvc']} </span>
            </div>
            <input type="submit"
                   className="submitButton"
                   value="Submit" />
            <div className="message"> { message } </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CardForm
