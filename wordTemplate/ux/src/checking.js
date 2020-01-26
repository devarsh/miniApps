import React from "react";
import { setIn, getIn } from "formik";
const FormConext = React.createContext({});
class MyForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    values: {},
    errors: {},
    touched: {}
  };
  setValue = (path, value) => {
    this.setState(state => ({
      values: setIn(state.values, path, value),
      errors: { ...state.errors },
      touched: { ...state.touched }
    }));
  };
  setTouched = path => {
    this.setState(state => ({
      values: { ...state.values },
      errors: { ...state.errors },
      touched: setIn(state.touched, path, true)
    }));
  };
  setError = (path, value) => {
    this.setState(state => ({
      values: { ...state.values },
      errors: setIn(state.errors, path, value),
      touched: { ...state.touched }
    }));
  };
  handleBlur = e => {
    this.setTouched(e.target.name);
  };
  handleChange = e => {
    this.setValue(e.target.name, e.target.value);
  };

  render() {
    return (
      <FormConext.Provider
        value={(handleBlur, handleChange, state)}
      ></FormConext.Provider>
    );
  }
}

class Field extends React.Component {
  static contextType = FormConext;
  constructor(props) {
    super(props);
  }
  render() {
    <div>hi</div>;
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {
      values: oldValues,
      errors: oldErrors,
      touched: oldTouched
    } = this.context.state;
  }
}
