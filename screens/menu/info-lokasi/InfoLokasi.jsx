import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const InfoLokasi = () => {
    const initial_places = {
        longitude: 110.36488921070645,
        latitude: -7.193647960785919,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

  return (
    <View>
      <MapView 
        style={styles.map}
        region={initial_places}
        showsUserLocation
        // provider='google'
        // showsMyLocationButton
      >
        <Marker coordinate={initial_places} title="Basecamp Mawar"  />
      </MapView>
    </View>
  )
}

export default InfoLokasi

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: 
    {
        width: '100%',
        height: '100%'
    }
})