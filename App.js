import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import Currency from './screen/Currency';
import Weather from './screen/Weather';
import CitiesVisited from './screen/CitiesVisited'

const Stack = createStackNavigator();
//Main Component
const App = () => {
  return (
    //Control navigation between screens
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" component={HomeScreen}
          options={{
            title: 'Welcome',
            headerTitleStyle: { alignSelf: 'center' },
          }}
        />
        <Stack.Screen name="Currency" component={Currency} />
        <Stack.Screen name="Weather"  component={Weather}/>
        <Stack.Screen name="Cities Visited"  component={CitiesVisited}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
