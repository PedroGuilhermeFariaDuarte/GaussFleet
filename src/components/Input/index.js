import React, {
  useEffect,
  useRef,
} from 'react';

import { Text } from "react-native"
import { useField } from '@unform/core';

// Style
import TextInput, { Container } from "./styles"

function Input({ name, children, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {children}
      <TextInput
        ref={inputRef}
        keyboardAppearance="default"
        defaultValue={defaultValue}
        placeholder={error}
        placeholderTextColor="red"
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        className={error ? "inputError" : ''}
        {...rest}
      />
    </Container>

  );
};

export default Input;
