import { useState } from "react";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function clearValue() {
    setValue("");
  }

  return {
    value,
    setValue,
    onChange: handleChange,
    clearValue,
  };
};

export default useFormInput;
