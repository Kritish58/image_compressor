import React, { Component } from 'react';
import { handleLogin } from '../utils/authenticate';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    alert: false,
    alertMessage: '',
    badRequest: false,
    formClassName: 'w-50 mx-auto',
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const res = await handleLogin(email, password);
    console.log(res);
    if (res.success) {
      this.setState({ email: '', password: '', alert: true, alertMessage: 'Register success', badRequest: false });
    } else {
      this.setState({ alert: true, alertMessage: res.message, badRequest: true });
    }
  };

  render() {
    const { email, password, alert, alertMessage, badRequest } = this.state;
    return (
      <>
        <form
          action="#"
          className={window.innerWidth < 576 ? 'w-100 mx-auto px-4' : 'w-50 mx-auto'}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h4 className="text-muted">Login</h4>
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
              balue={email}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="my-2">
            <button type="submit" className="btn btn-sm btn-success">
              Login
            </button>
          </div>
        </form>
      </>
    );
  }
}
