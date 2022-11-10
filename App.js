import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
//import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';

const Drawer = createDrawerNavigator();

const Pokemons = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfield, setSearchField] = useState('');

  useEffect(() => {
    fetchPokemons();
  },[]);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=500')
    .then(response => response.json())
    .then(pokemons => setPokemons(pokemons.results));
  };

  return(
    <View style={styles.container}>
      <View>
        <TextInput placeholder='Filtrar Pokemons'
        onChangeText={value => setSearchField(value)}
        value={searchfield}
          />
      </View>
      <ScrollView>
        {pokemons
        .filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchfield.toLocaleLowerCase())
        )
        .map((pokemon, index) => {
          return(
           
            <Text>{pokemon.name}</Text>
            

           
          )
          
        }
       
        )}
      </ScrollView>
    </View>
  )
};

function Home(){
  return (
    <View style={styles.container}>
      <Text>MINI POKEDEX</Text>
      <Image style={{ width: 100, height: 100 }} 
      source={{uri:'https://img.pokemondb.net/sprites/x-y/normal/charizard.png',}}
      />
    </View>
  );
}

function Details(){
  return (
    <View style={styles.container}>
      <Text>En la pestaña de "Pokemons" veremos nombres de pokemons donde podemos filtrarlos por su nombre</Text>
    </View>
  );
}

export default function App() {
  return (
    
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home}/>
        <Drawer.Screen name='Details' component={Details}/>
        <Drawer.Screen name='Pokemons' component={Pokemons}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
