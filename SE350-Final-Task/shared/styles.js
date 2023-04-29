import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c6af4f",
      alignItems: "center",
      justifyContent: "center",
    },
  
    image: {
      marginBottom: 20,
      height: "60%",
    },
  
    inputView: { //The view for the containers of the email and password txts
      backgroundColor: "#05352c",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
  
      alignItems: "center",
    },
  
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color: "#c6af4f",
    },
  
    forgot_button: {
      height: 30,
      //marginBottom: 20,
      backgroundColor: "#c6af4f", 
    },
  
    loginBtn: {
  
     height: 30,
      marginBottom: 20, 
      width: "80%",
      borderRadius: 25,
      height: 50,
      color: "#c6af4f",
      alignItems: "center",
      justifyContent: "center",
     // marginTop: 20,
      backgroundColor: "#05352c", 
    },
  });

  export default styles;