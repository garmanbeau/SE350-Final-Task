import { StatusBar } from 'expo-status-bar';
import styles from '../shared/styles';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../assets/pineapple-animation.json')} 
        style={{ width: '80%', aspectRatio: 1 }} 
        autoPlay
        loop
        speed={1} 
      />
      <Text>No music yet, but here's a dancing pineapple </Text>
      <StatusBar style="auto" />
    </View>
  );
}


