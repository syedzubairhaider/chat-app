import React, { Component } from 'react'

class SignupForm extends Component {
  render() {
    return (
      <div>
        <form>
          <h1> join us</h1>
          <label>Username</label>
          <input name="usernamme" type="text" className="form-control" />
          <button className="btn">Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignupForm
