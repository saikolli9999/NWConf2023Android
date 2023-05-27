import React from 'react';
import { TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';

const MyForm = () => {
  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Email is required';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        }
        if (!values.fName) {
          errors.fName = 'First name is required'
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <TextInput
            onChangeText={handleChange('fName')}
            onBlur={handleBlur('fName')}
            value={values.fName}
            placeholder="FirstName"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          {touched.fName && errors.fName && <Text>{errors.fName}</Text>}

          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
          />
          {touched.email && errors.email && <Text>{errors.email}</Text>}

          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {touched.password && errors.password && <Text>{errors.password}</Text>}

          <Button onPress={handleSubmit} title="Submit" />
        </>
      )}
    </Formik>
  );
};

export default MyForm;
