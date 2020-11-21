import React from 'react';
import { ScrollView, View ,Linking, Text, StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper'

//Get current weather data 
const Weather = ({route}) => {
  const temp = route && route.params.main.temp;
  const tempMax = route && route.params.main.temp_max;
  const tempMin = route && route.params.main.temp_min;
  const tempFeels = route && route.params.main.feels_like;
  const hum = route && route.params.main.humidity;
  const press = route && route.params.main.pressure;
  const wind = route && route.params.wind.speed;

  console.log(route)
  
  return (
    <ScrollView>
      <Text style={styles.textWeather}>
        Temperature <Badge style={styles.textWeather}>{temp}</Badge>
        °C </Text>

      <Text style={styles.textWeather}>
        Temp Max <Badge style={styles.textWeather}>{tempMax}</Badge>
        °C</Text>

      <Text style={styles.textWeather}>
        Temp Min <Badge style={styles.textWeather}>{tempMin}</Badge>
        °C</Text>  

      <Text style={styles.textWeather}>
        Feels like <Badge style={styles.textWeather}>{tempFeels}</Badge>
        °C</Text>

      <Text style={styles.textWeather}>
        Humidity <Badge style={styles.textWeather}>{hum}</Badge>
        %</Text>

      <Text style={styles.textWeather}>
        Pressure <Badge style={styles.textWeather}>{press}</Badge>
        hPa</Text>

      <Text style={styles.textWeather}>
        Wind Speed <Badge style={styles.textWeather}>{wind}</Badge>
        m/s</Text>

    </ScrollView>
  )
};

const styles = StyleSheet.create({
  textWeather: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: '5%',
  }
})

export default Weather
