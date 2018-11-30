import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';


import * as actions from '../actions';
import CustomInput from './CustomInput';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

  }

  async onSubmit(formData) {
    await this.props.calculateHash(formData);
    if (!this.props.errorMessage) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <h2>Hash as a service</h2><br />
              Hash anything in a second,Let's Play<br />
 
              <Field
                name="data"
                type="text"
                id="data"
                label="Text to hash *"
                placeholder="put something"
                component={CustomInput} />
            </fieldset>
            <div>
              <label>Algorithm</label>
              <div>
                <Field name="algorithm" component="select">                 
                  <option value="md5">md5</option>               
                </Field>
              </div>
            </div>
            <fieldset>
              <Field
                name="iteration"
                type="number"
                id="iteration"
                label="Number of Iterations"
                placeholder="1234"
                component={CustomInput} />
            </fieldset>

            {this.props.errorMessage ?
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div> : null}

            <button type="submit" className="btn btn-primary">Confirm</button>
          </form>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'dashboard' })
)(Dashboard)