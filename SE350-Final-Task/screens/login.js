//key password: keypasswd
//key passwd at /loginapp/andoid: passwd
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Platform
} from "react-native";
import * as Google from 'expo-auth-session/providers/google';
import styles from '../shared/styles';
import axios from "axios";



export default function LoginScreen ({ navigation }){
 //define stateful variables and functions used to update the values
    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setText] = useState("");
    const [accessToken, setAccessToken] = useState();

    const [request, response, promptAsync]=Google.useAuthRequest({
      androidClientId:"515838955290-jca3f4ae48jgo91ieu4disadrgneja4m.apps.googleusercontent.com", 
      iosClientId: "515838955290-knqdehllho3vi72p2o5ad72j355oljrr.apps.googleusercontent.com", 
      expoClientId: "515838955290-dlqs4rn5btcak50gru0lfgrptq4o588o.apps.googleusercontent.com"
    });

    useEffect(() => {
      getData();
      if(response?.type === "success"){
        setAccessToken(response.authentication.accessToken);
      }
    }, [response]);
    
  //client id taken from google cloud console


    //gets data from url and stores it in an array
    function getData(){
      axios.get('http://3.134.126.64:3000/accounts')
      .then((response) => {
        const myObjects = response.data;
        setData(myObjects);
      });

      //read the data to the console
      console.log(data);
    }
  //function called when when login button is clicked
    function loginHandler(){
  
      getData();
  
        //checks to see if email and password fields are filled
      if(email == "" || password == ""){
        //if fields are not filled, give user alert
        setText("Both email and password field must be filled");
        alert(errorText);
        console.log("email or password was null value.")
      }else{
         userFound = false;
         //checks for email in array of data
        for(let i = 0; i < data.length; i++){
          if(email == data[i].email){
            console.log("Username found at index ", i);
            userFound=true;
            if(userFound){
              // validate password
              if(password == data[i].passwd){
                // login succesful
                console.log("Login succesful as user: ", email);
                //bring user to home screen
                HomeNav();
              }else{
                setText("Incorrect email or password");
                alert(errorText);
                console.log("Invalid password for user: ", email);
              }
          }
          } 
        } if (!userFound){
            setText("Incorrect email or password");
            alert(errorText);
        }
      }
    }
  
    function creAccNav(){
      navigation.navigate('Create Account');
    }
  
    function HomeNav(){
      navigation.navigate('Home');
    }

    return (
  <View style={styles.container}>
        
        <Image style={styles.image} source={require("../assets/Pineapple.png")} /> 
  
       <StatusBar style="auto" />
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
           placeholder="Password"
           placeholderTextColor="#c6af4f"
           secureTextEntry={true}
           onChangeText={(password) => setPassword(password)}
         />
       </View>
  
       <TouchableOpacity>
         <Text style={styles.forgot_button} onPress={creAccNav}>Don't Have an Account? Sign Up</Text>
       </TouchableOpacity>

<TouchableOpacity>
         <Text style={styles.forgot_button} onPress={accessToken ? getUserData : () => promptAsync({useProxy: false, showInRecents: true})}>Sign In with Google</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.loginBtn}>
       <Text style={styles.TextInput} onPress={loginHandler}>LOGIN</Text> 
       </TouchableOpacity>
      
     </View>
    );
  }

  