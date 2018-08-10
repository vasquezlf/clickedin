import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  }

  onChange = (event) => {
  this.setState({ [event.target.name]: event.target.value})}

  onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }
    this.props.registerUser(newUser, this.props.history);

}

componentDidMount(){
  if(this.props.auth.isAuthenticated) {
    this.props.history.push("/dashboard")
  }
}
  // constructor() {
  //   super();
  //   this.state = {
  //     name: "",
  //     email: "",
  //     password: "",
  //     password2: "",
  //     errors: {}
  //   };
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // };

  //Get errors from redux state, put new props into component state
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  // onChange(event) {
  //   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
  //   this.setState({ [event.target.name]: event.target.value})
  // }

  // onSubmit(event) {
  //   event.preventDefault();
  //
  //   const newUser = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password,
  //     password2: this.state.password2,
  //   }
  //
  //   this.props.registerUser(newUser, this.props.history);
  //
  //   // Test API
  //   // axios.post("/api/users/register", newUser)
  //   //   .then(res => console.log(res.data))
  //   //   .catch(err => this.setState({ errors: err.response.data}));
  //
  // }





  render() {
    const {errors} = this.state;

    // const { user } = this.props.auth;

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Define states
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Get state to component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));