import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, View ,Linking, Text, StyleSheet } from 'react-native';
import {openCageKey, weatherKey} from './key.js';
import * as Location from 'expo-location';


//HomeScreen Component
const HomeScreen = ({ navigation }) => {
  let [data, setData] = React.useState('');
  let [rates, setRate] = React.useState('');
  const [lat, setLatitude] = React.useState(null);
  const [lng, setLongitude] = React.useState(null);
  const [weather, setWeather] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState(null);

  const isoCode = data && data.results[0].annotations.currency.iso_code;

//Function to get GPS location 
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

//Get current location from OpenCageData API
  React.useEffect(() => {
    if(lat && lng){
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${lat}+${lng}`,
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));}
  }, [lat,lng]);

//Get currency code and exchange rate from ExchangeRatesAPI
  React.useEffect(() => {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=${isoCode}`,
    )
      .then((response) => response.json())
      .then((json) => setRate(json))
      .catch((error) => console.log(error));
  }, [isoCode]);

//Get weather information from the OpenWeatherMap API
  React.useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherKey}`,
    )
      .then((response) => response.json())
      .then((json) => setWeather(json))
      .catch((error) => console.log(error));
  }, [lat, lng]);

console.log(rates)
console.log(weather)

  return (
  
      <View>
        <Text style={styles.textBase}>
          Enjoy {(data && data.results[0].components.city + ' '+ data.results[0].components.country )||(data && data.results[0].components.county +' '+ data.results[0].components.country)}
          </Text>

{/*Button that directs Currency screen sending the data returned from the API exchange rate*/}
        <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Currency', rates) }>
           Currency 
        </Button>

{/*Button that directs Weather screen sending the data returned from the API weather information*/}
        <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Weather', weather)}  > Weather
        </Button>

{/*Button that directs Cities Visited screen*/}
<Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Cities Visited', {data, weather})}  > Cities Visited
        </Button>        
        </View>
  );  
};

const styles = StyleSheet.create({
  button:{
    backgroundColor : 'green',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '15%',
  },

  textBase: {
    fontFamily: 'sans-serif',
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: '10%',
  }
})

export default HomeScreen;
