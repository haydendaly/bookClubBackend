/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import users from "../functions/users";

export default function PhoneInput({ navigation }) {
  const [number, setNumber] = React.useState("");
  const [errorMsg, changeErrorMsg] = React.useState("#fff");

  const doneTapped = () => {
    let text = number;
    if (text.length == 10) {
      users.phoneAuth(text, data => {
        if (data) {
            navigation.navigate("TextVerification", {
              code: data.code,
              number: text
            });
          } else {
            changeErrorMsg('#8b0000');
          }
      });
    } else {
      changeErrorMsg(text.length > 10 ? "#8b0000" : "#fff");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>What's your number?</Text>
        <Text style={styles.subHeader}>We just need your number for verification and won't spam you or sell your data.</Text>
      </View>
      <TextInput
        style={styles.input}
        keyboardType={"phone-pad"}
        placeholder="(123)-456-7890"
        textAlign={"center"}
        autoFocus={true}
        autoCompleteType={"tel"}
        onChangeText={val => setNumber(val)}
      />      
      <TouchableOpacity
        style={styles.doneButton}
        activeOpacity={0.75}
        onPress={doneTapped}
      >
        <View>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={{ color: errorMsg }}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: '#143e60',
    fontWeight: '600'
  },
  subHeader: {
    fontSize: 20,
    color: '#143e60',
    padding: '5%',
    fontWeight: '400',
    textAlign: 'center'
  },
  textContainer: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#20639B',
    width: '85%',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500'
  },
  input: {
    width: '60%',
    borderWidth: 2,
    borderColor: '#143e60',
    margin: 8,
    padding: 18,
    borderRadius: 8,
    fontSize: 24
  }
});
