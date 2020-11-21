import * as React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const Currency = ({ route }) => {
//Collect input information
  const [localAmount, setLocal] = React.useState(0);
  const [usdAmount, setUsd] = React.useState(0);
  
//Get currency data 
 const localCurrency = route && route.params.rates; 
 const rate = localCurrency && localCurrency[Object.keys(localCurrency)[0]];
 
 console.log(console.log(route))
  return (
    <View>
      <TextInput
      label="Type USD"
      style={styles.input}
      onChangeText={(amount) => setLocal(amount * rate) }
    />
    <Text style={styles.textAmount}>
      The Local Amount is: {localAmount && localAmount.toFixed(2)}
    </Text>

    <TextInput style={styles.textAmount}
      label="Type Local Currency"
      style={styles.input}
      onChangeText={(amount) => setUsd(amount / rate) }
    />
    <Text style={styles.textAmount}>
      The USD amount is: {usdAmount && usdAmount.toFixed(2)}
    </Text>
   </View>
  );
};

const styles = StyleSheet.create({
  input:{
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '15%',
  },

  textAmount: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: '5%',
  }

})

export default Currency;
