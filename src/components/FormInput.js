import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width

const FormInput = ({ iconType, labelValue, placeholderText, ...rest }) => {

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconstyle}>
        <AntDesign name={iconType} size={20} color="#666" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        numberOfLines={1}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 18,
    borderRadius: 3,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  iconstyle: {
    padding: 8,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 38,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
