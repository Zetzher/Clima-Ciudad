/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false)
  const [resultado, guardarResultado] = useState({})
  const {bgcolor, guardarBgcolor} = useState('rgb(71, 149, 212)')

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

 

  const { ciudad, pais } = busqueda
  useEffect(() => {
   const consultarclima = async () => {
    if(consultar) {
      const APIKey = '414f6fc78113909b7526611b6057e1b9'
      const url= `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIKey}`

      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        const kelvin = 273.15;
        const { main } = resultado;
        const actual = main.temp - kelvin;

        if( actual < 10 ){
          guardarBgcolor('rgb(105, 108, 149')
        } else if (actual >= 10 && actual < 25){
          guardarBgcolor('rgb(71, 149, 212')
        } else {
          guardarBgcolor('rgb(178, 28, 61')
        }

      } catch (error) {
        mostrarAlerta()
      }
      
    }
   }
   consultarclima()
  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados, intenta con otra ciudad o país',
        [
            {text: '¡De acuerdo!'}
        ]
    )
}

const bgColorApp = {
  backgroundColor: bgcolor
}

  return (
    <>
    <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
    <View style={[styles.app, bgColorApp]}>
      <View style={styles.contenido}>
      <Clima
        resultado={resultado} />
      <Formulario
      busqueda={busqueda}
      guardarBusqueda={guardarBusqueda}
      guardarConsultar={guardarConsultar} />
      </View>
    </View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
