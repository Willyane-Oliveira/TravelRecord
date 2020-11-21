import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, View, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';
import { set } from 'react-native-reanimated';

const CitiesVisited = ({route}) => {
  const data = route.params.data;
  const weather = route.params.weather;
  
  const {city, county} = data.results[0].components;
  const country = data.results[0].components.country;
  const temperature = weather.main.temp;
  const [myPlaces, setPlaces] = React.useState(false);

  const citiesData = async () =>{
    try{
      let values =  {
        country: country,
        city: city || county,
        temperature: temperature
      };

      await AsyncStorage.setItem('values', JSON.stringify(values));
      let places = JSON.parse(await AsyncStorage.getItem('places')) || [];
      places.push( values);
      await AsyncStorage.setItem('places', JSON.stringify(places));
      showInfo();

    }catch(e){
      console.log(error);
    }
  } 
  const showInfo = async () =>{
    let locations = await AsyncStorage.getItem('places') &&
    JSON.parse(await AsyncStorage.getItem('places'));

    setPlaces(locations);
  }

  React.useEffect(() => {
    showInfo();
  },[])
  return (
    <View>
      <Button style={styles.button} title= "Save Info" onPress= {citiesData} />
      {myPlaces && myPlaces.map((item, index) => (
         <ul key={index}>
          <li>{item.country}</li>
          <li>{item.city}</li>
          <li>{item.temperature} °C</li>
        </ul>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  button:{
    backgroundColor : 'blue',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '15%'
  }
})

export default CitiesVisited;
