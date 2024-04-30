import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const InputWithLabel = ({ value, onChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        // eslint-disable-next-line react/prop-types
        value={value}
        // eslint-disable-next-line react/prop-types
        onChange={onChange}
        name="title"
        placeholder="Type here"
        ref={inputRef}
      />
    </>
  );
};

export default InputWithLabel;
