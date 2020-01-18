import React from "react";
import { useForm } from "react-hook-form";

export default () => {
  const { register, watch, error } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  console.log(useForm());
  return (
    <>
      <form>
        <TextField type="text" name="name" ref={register} />
        <TextField type="text" name="age" ref={register} />
      </form>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
};

const TextField = ({ type, register, name }) => {
  const ref = React.useRef(0);
  return (
    <div>
      <input type={type} name={name} ref={register} />
      render Count : {ref.current++}
    </div>
  );
};
