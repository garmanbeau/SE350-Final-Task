
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from '../shared/styles';
import axios from "axios";

export default function CreateAccountScreen ({navigation}){

const [email, setEmail] = useState("");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [password, setPassword] = useState("");
const [errorText, setText] = useState("");

//function called when user presses create account button
function createAccount(){
  if(email == "" || firstName == "" || lastName == "" || password == ""){
    setText("All fields must be filled.");
    alert(errorText);
  } else { //all fields are filled
    //send to store in database using axios
    console.log("The following are to be sent to the DB");
    console.log("email:" + email);
    console.log("first name: " + firstName);
    console.log("last name: " + lastName);
    console.log("password: " + password);

    axios.post('http://3.134.126.64:3000/acc', {
      email: email, 
      first_name: firstName, 
      last_name: lastName, 
      passwd: password, 
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    navigation.navigate('Login'); 
  }

}
//<Image style={styles.image} source={require("../assets/Pineapple.png")} /> goes on line 54
    return (
      <View style={styles.container}>
        
      

     <View style={styles.inputView}>
       <TextInput
         style={styles.TextInput}
         placeholder="Email"
         placeholderTextColor="#c6af4f"
         onChangeText={(email) => setEmail(email)}
       />
     </View>

     <View style={styles.inputView}>
       <TextInput
         style={styles.TextInput}
         placeholder="First Name"
         placeholderTextColor="#c6af4f"
         onChangeText={(firstName) => setFirstName(firstName)}
       />
        </View>
        <View style={styles.inputView}>
       <TextInput
         style={styles.TextInput}
         placeholder="Last Name"
         placeholderTextColor="#c6af4f"
         onChangeText={(lastName) => setLastName(lastName)}
       /></View>

<View style={styles.inputView}>
       <TextInput
         style={styles.TextInput}
         placeholder="Password"
         placeholderTextColor="#c6af4f"
         secureTextEntry={true}
         onChangeText={(password) => setPassword(password)}
       />
     </View>
     <TouchableOpacity style={styles.loginBtn}>
       <Text style={styles.TextInput} onPress={createAccount}>Create Account</Text> 
       </TouchableOpacity>
   </View>
    );
  }

