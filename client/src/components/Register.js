import React, { Component } from 'react';
import { handleRegister } from '../utils/authenticate';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    alert: false,
    alertMessage: '',
    badrequest: false,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const res = await handleRegister(email, password);
    if (res.success) {
      this.setState({ email: '', password: '', alert: true, alertMessage: 'Register success', badRequest: false });
    } else {
      this.setState({ alert: true, alertMessage: res.message, badRequest: true });
    }
  };
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { email, password, alert, alertMessage, badRequest } = this.state;
    return (
      <>
        <form
          action="#"
          className={window.innerWidth < 576 ? 'w-100 mx-auto' : 'w-50 mx-auto'}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h4 className="text-muted">Register</h4>
          {alert ? <div className="small text-muted">{alertMessage}</div> : null}
          <div className="my-2">
            <input
              className={badRequest ? 'form-control border-danger' : 'form-control'}
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="my-2">
            <input
              className={badRequest ? 'form-control border-danger' : 'form-control'}
              type="text"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="my-2">
            <button className="btn btn-sm btn-success">Register</button>
          </div>
        </form>
      </>
    );
  }
}
