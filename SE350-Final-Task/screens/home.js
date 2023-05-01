
 import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image,
     useWindowDimensions, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../shared/styles';

export default function MainScreen({navigation}) {
//define use states
const [name, setName] = useState("");
const [artist, setArtist] = useState("");
const [genre, setGenre] = useState("");
const [imageUri, setImageUri] = useState("");
const [music, setMusic]= useState([]);
const [temp, setTemp] = useState([]);
//define cookie use states
const [rockPresses, setRockPresses] = useState(0);
const [rapPresses, setRapPresses] = useState(0);
const [countryPresses, setCountryPresses] = useState(0);
const [bluesPresses, setBluesPresses] = useState(0);
const [popPresses, setPopPresses] = useState(0);
const [RnBPresses, setRnBPresses] = useState(0);

const [data, setData] = useState([{
  rock: 0, 
  rap: 0,
  country: 0,
  blues: 0,
  pop: 0, 
  rnb: 0
},]);
const [rockCookie, setRockCookie] = useState(0);
const [rapCookie, setRapCookie] = useState(0);
const [countryCookie, setCountryCookie] = useState(0);
const [bluesCookie, setBluesCookie] = useState(0);
const [popCookie, setPopCookie] = useState(0);
const [RnBCookie, setRnBCookie] = useState(0);

function sendCookies(){
  axios.post('http://3.134.126.64:3000/cookies', {
    rock: rockPresses,
    rap: rapPresses,
  country: countryPresses, 
    blues: bluesPresses, 
    pop: popPresses, 
    RnB: RnBPresses,
  })
  .then(function (response) {
   // console.log(response);
    alert("Submission successful!");
    remove();
  })
  .catch(function (error) {
    console.log(error);
    alert("Submission not sent, please wait a while and try again");
  });
}
function getCookies(){
    axios.get('http://3.134.126.64:3000/genredata')
    .then((response) => {
      const myObjects = response.data;
        setData(myObjects);

    });
    // rap rock country blues pop rnb
    //read the data to the console
    setRockCookie(data[0].rock);
    setRapCookie(data[0].rap);
    setCountryCookie(data[0].country);
    setBluesCookie(data[0].blues);
    setPopCookie(data[0].pop);
    setRnBCookie(data[0].rnb);
    
    
}

//save functions
const saveRock = async() => {
  try {
    await AsyncStorage.setItem("rock", JSON.stringify(rockPresses+1));
  } catch (err) {
    alert(err);
  }
}
const saveRap = async() => {
  try {
    
    await AsyncStorage.setItem("rap", JSON.stringify(rapPresses+1));
  } catch (err) {
    alert(err);
  }
}
const saveCountry = async() => {
  try {
    await AsyncStorage.setItem("country", JSON.stringify(countryPresses+1));
  } catch (err) {
    alert(err);
  }
}
const saveBlues = async() => {
  try {
    await AsyncStorage.setItem("blues", JSON.stringify(bluesPresses+1));
  } catch (err) {
    alert(err);
  }
}
const savePop = async() => {
  try {
    
    await AsyncStorage.setItem("pop", JSON.stringify(popPresses+1));
  } catch (err) {
    alert(err);
  }
}
const saveRnB = async() => {
  try {
    await AsyncStorage.setItem("rnb", JSON.stringify(RnBPresses+1));
  } catch (err) {
    alert(err);
  }
}

// ---------- load functions ---------- //
const loadRock = async() => {
  try {
    let rockPresses = await AsyncStorage.getItem("rock");

    if (rockPresses !== null) {
      setRockPresses(JSON.parse(rockPresses));
    }
  } catch (err) {
    alert(err);
  }
}
const loadRap = async() => {
  try {
    let rapPresses = await AsyncStorage.getItem("rap");

    if (rapPresses !== null) {
      
      setRapPresses(JSON.parse(rapPresses));
    }
  } catch (err) {
    alert(err);
  }
}
const loadCountry = async() => {
  try {
    let countryPresses = await AsyncStorage.getItem("country");

    if (countryPresses !== null) {
      setCountryPresses(JSON.parse(countryPresses));
    }
  } catch (err) {
    alert(err);
  }
}

const loadBlues = async() => {
  try {
    let bluesPresses = await AsyncStorage.getItem("blues");

    if (bluesPresses !== null) {
      setBluesPresses(JSON.parse(bluesPresses));
    }
  } catch (err) {
    alert(err);
  }
}
const loadPop = async() => {
  try {
    let popPresses = await AsyncStorage.getItem("pop");

    if (popPresses !== null) {
      
      setPopPresses(JSON.parse(popPresses));
    }
  } catch (err) {
    alert(err);
  }
}
const loadRnB = async() => {
  try {
    let RnBPresses = await AsyncStorage.getItem("rnb");

    if (RnBPresses !== null) {
      setRnBPresses(JSON.parse(RnBPresses));
    }
  } catch (err) {
    alert(err);
  }
}

// ---------- Remove Function ---------- //
const remove = async () => {
  try {
    await AsyncStorage.removeItem("rock");
    await AsyncStorage.removeItem("rap");
    await AsyncStorage.removeItem("country");
    await AsyncStorage.removeItem("blues");
    await AsyncStorage.removeItem("pop");
    await AsyncStorage.removeItem("rnb");
    console.log("removed");
  } catch (err) {
    alert(err);
  } finally {
    setRockPresses(0);
    setRapPresses(0);
    setCountryPresses(0);
    setBluesPresses(0);
    setPopPresses(0);
    setRnBPresses(0);
  }
}

//add song function adds a song that the user inputs to the db
function AddSong(){
    axios.post('http://3.134.126.64:3000/add', {
      name: name, 
      artist: artist, 
      genre: genre, 
      imageuri: imageUri, 
    })
    .then(function (response) {
      //console.log(response);
      setName("");
      setArtist("");
      setGenre("");
      setImageUri("");
      alert("success!");
    })
    .catch(function (error) {
      console.log(error);
      alert("Something went wrong. Please try again");
    });

};
//might need to define let Xcount = Xpresses
function AddCount(name){
  //console.log(name);
  if (name == "Rock"){
    setRockPresses(rockPresses+1);
    saveRock();
  } else if (name == "Rap"){
    setRapPresses(rapPresses+1);
    saveRap();
  }else if (name == "Country"){
    setCountryPresses(countryPresses+1);
    saveCountry();
  }else if (name == "Blues"){
    setBluesPresses(bluesPresses+1);
    saveBlues();
  }else if (name == "Pop"){
    setPopPresses(popPresses+1);
    savePop();
  }else if (name == "R&B"){
    setRnBPresses(RnBPresses+1);
    saveRnB();
  }else if (name == "load"){
    console.log(name);
  }else {
    console.log("something went wrong");
    alert("Something went wrong. Please try again. Add Count");
  }
}
//initialize array so don't have to click genre button more than once
useEffect(() => {
getMusicByGenre("Rap");
getCookies();
loadRock();
loadRap();
loadCountry();
loadBlues();
loadPop();
loadRnB();
}, []);
//defining view that use flatlist

//view used in the select screen
const GridViewSelect = ({ name}) => (
  <TouchableOpacity style={styles.gridStyle1} onPress={()=>getMusicByGenre(name)}>
  <Text style={styles.gridText}>{name}</Text>
  </TouchableOpacity>
);

//view used in the show screen
const GridViewShow = ({ name, artist, genre, src}) => (
  <TouchableOpacity style={styles.gridStyle2} onPress={()=>MusicNav()}>
  <Text style={styles.gridText}>{name}</Text>
  <Image source={{uri: src}} style={{height:150, width:150}} />
  <Text style={styles.gridText}>{artist}</Text>
  <Text style={styles.gridText}>{genre}</Text>
  </TouchableOpacity>
);

//function retrieves music by genre from the db
function getMusicByGenre(name){
//console.log(name);
AddCount(name); //counts which genre was clicked
if (name != "load"){
axios.get('http://3.134.126.64:3000/search')
      .then((response) => {
        const myObjects = response.data;
        setTemp(myObjects);
      });
      //read the data to the console
      //console.log(temp);
      let tempArray =[];
        let j = 0;
      for(let i = 0; i<temp.length; i++){
        if(name == temp[i].genre ){
            console.log("match found");
            tempArray[j] =temp[i];
            j++;
            console.log(tempArray);

          } //else{ console.log("not found");}
      }
      setMusic(tempArray);

      //console.log(music);
    }
}
function MusicNav(){
  navigation.navigate('Music');
}

function LogAsync(){
    console.log("rock"+ rockPresses);
    console.log("rap" + rapPresses);
    console.log("country" + countryPresses);
    console.log("blues" + bluesPresses);
    console.log("pop" + popPresses);
    console.log("RnB"+ RnBPresses);
  }
//the page for the Add section
    const AddScreen = () => (
    <View style={styles.container2}>
        <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
        style={styles.imagebackground} imageStyle={{opacity: 0.5}}>
             <StatusBar style="auto" />
             <Text style={{fontSize: 26, marginTop: -50, marginBottom: 50, color: "black"}}>Add a song</Text>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Name"
            placeholderTextColor="#c6af4f"
            onChangeText={(name) => setName(name)}
            value={name}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Artist"
            placeholderTextColor="#c6af4f"
            onChangeText={(artist) => setArtist(artist)}
            value={artist}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="Genre"
            placeholderTextColor="#c6af4f"
            onChangeText={(genre) => setGenre(genre)}
            value={genre}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput style={styles.TextInput}
            placeholder="URL to Image Cover"
            placeholderTextColor="#c6af4f"
            onChangeText={(imageUri) => setImageUri(imageUri)}
            value={imageUri}
            />
        </View>
        <TouchableOpacity style={[styles.inputView, {borderRadius:0, width:"50%", marginTop:50, marginBottom:-20}]} onPress={()=>AddSong()}>
            <Text style={[styles.TextInput,{fontSize: 20}]}>Submit</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>

    );

    const genreNames = [
      {id: 1, name: 'Rock'},
      {id: 2, name: 'Rap'},
      {id: 3, name: 'Country'},
      {id: 4, name: 'Blues'},
      {id: 5, name: 'Pop'},
      {id: 6, name: 'R&B'},
    ];

    //view of the select tab
    const SelectScreen=()=>(
      <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
      style={styles.imagebackground2} imageStyle={{opacity: 0.5}}> 
     <FlatList
        data={genreNames} //uses array genreNames
        renderItem={({ item }) => <GridViewSelect name={item.name}/>} //takes data array and passes it to gridview function
        keyExtractor={item => item.name}
        numColumns={2}// defines number of columns
        key={item => item.name} //id
      />
    </ImageBackground>
    );
    //view of the show tab

    const ShowScreen=()=>(
    <ImageBackground source={require("../assets/Pineapple.png")} resizeMode='cover' 
      style={styles.imagebackground2} imageStyle={{opacity: 0.5}}> 
     <FlatList
        data={music} //uses array music
        renderItem={({ item }) => <GridViewShow name={item.name} artist={item.artist} genre={item.genre} src={item.imageuri}/>} //takes data array and passes it to gridview function
        keyExtractor={item => item.name}
        numColumns={2}// defines number of columns
        key={item => item.name} //id
      />
 </ImageBackground>
    );

    const GraphScreen=()=>(
      <View style={styles.container}> 
     
      <View>
   <Text>Most Popular Music by Genre</Text>
   <LineChart
     data={{
       labels: ["Rock", "Rap", "Country", "Blues", "Pop", "R&B"],
       datasets: [
         {
           data: [
              0 + rockCookie,
              0 + rapCookie,
              0 + countryCookie,
              0 + bluesCookie,
              0 + popCookie,
              0 + RnBCookie, 
           ]
         }
       ]
     }}
     width={Dimensions.get("window").width} // from react-native
     height={220}
     
     yAxisInterval={20} // optional, defaults to 1
     chartConfig={{
       backgroundColor: "#e26a00",
       backgroundGradientFrom: "#fb8c00",
       backgroundGradientTo: "#ffa726",
       decimalPlaces: 0, // optional, defaults to 2dp
       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
       style: {
         borderRadius: 16
       },
       propsForDots: {
         r: "6",
         strokeWidth: "2",
         stroke: "#ffa726"
       }
     }}
     bezier
     style={{
       marginVertical: 8,
       borderRadius: 16
     }}
   />
 </View>

 <TouchableOpacity onPress={()=>sendCookies()}>
          <Text> Send the Data</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>getCookies()}>
          <Text> Get the stats</Text>
          </TouchableOpacity>
       </View>
      );


    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([ //creates tabs with Titles and keys
    { key: 'first', title: 'Add' },
    {key: 'second', title: 'Select'},
    {key: 'third', title: 'Show'},
    {key: 'fourth', title: 'Stats'}
  ]);
  
  const renderScene = SceneMap({ //renders the routes defined above
    first: AddScreen,
    second: SelectScreen,
    third: ShowScreen,
    fourth: GraphScreen,
  });

  return (
    <TabView //facilitaes the rendering and management of tabs
      navigationState={{ index, routes }} //required, represents state for the tab view
      /* each state should have an index, 
      rout, key, title, icon, 
      accessibilityLabel, testID,  */
      renderScene={renderScene}// required, renders page for tab
      onIndexChange={setIndex} // required, callback called on tab change recieves the index of new tab
      initialLayout={{ width: layout.width }}
      renderTabBar={props=> <TabBar {...props} 
        renderLabel={({route})=>(<Text style={{color: '#c6af4f', margin: 8}}>{route.title}</Text>)} //colors the Text
        style={{backgroundColor: '#05352c'}}/>} // colors the tab bar
    />
  );
}
