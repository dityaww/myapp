import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useState } from 'react'

const initial_places = {
  longitude: 110.36488921070645,
  latitude: -7.193647960785919,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const InfoRute = () => {
  const [data, setData] = useState({
    segmen1: 'Jalur yang di lewati cukup jelas banyak melewati warung sebelum masuk kawasan lereng gunung. Trek masih ringan, tidak terlalu menanjak tapi dikelilingi semak, rumput dan jarang pohon besar pemandangan kota semarang terlihat di sebalah kanan. Pos 1 berupa gubuk kecil beratap seng pos 1 cocok buat istirahat sebentar dan memulihkan tenaga sebelum melanjut perjalanan. Dari Basecamp Mawar menju Pos 1 membutuhkan waktu sekitar 1 jam 20 menit bisa kurang bisa lebih tergantung fisik sobat. ',
    segmen2: 'Jalur pendakian masih sama dengan pos 1 dengan trek yang masih datar, teduh dan sejuk membuat suasana pendakian jadi lebih menyenangkan. Kalau sobat sudah bertemu aliran air menandakan pos 2 sudah setengah perjalanan. Shelter pos 2 tidak beda jauh dengan shelter pos 1. Dari Pos 1 ke Pos 2 membutuh waktu sekitar 25 menit bisa kurang bisa lebih. ',
    segmen3: 'Dari Pos 2 menuju Pos 3 medan masih sama seperti yang saya jelaskan diatas pepohonan yang rimbun masih menjadi penyelamat dari teriknya sinar sang surya. Trek tanah yang padat berubah menjadi jalan makadam menandakan sobat akan segera sampai di pos 3.',
  })
  return (
    <View style={styles.container}>
      <ScrollView>

      <SafeAreaView style={styles.wrapper}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 14 }}>Rute Pendakian</Text>
        </View>

        <View style={{ display: 'flex', flexDirection :'column', gap: 16}}>
          <View>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 17 }}>Deskripsi Rute</Text>
            </View>
            <View style={{ display: 'flex', flexDirection :'column', gap: 8 }}>
              <View style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Text style={{ fontSize : 15, fontWeight: 'bold' }}>Titik Awal</Text>
                <Text>Basecamp Mawar</Text>
              </View>
              <View style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Text style={{ fontSize : 15, fontWeight: 'bold' }}>Titik Akhir</Text>
                <Text>Puncak Gunung Ungaran</Text>
              </View>
              <View style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Text style={{ fontSize : 15, fontWeight: 'bold' }}>Titik Istirahat</Text>
                <View>
                  <Text>Pos 1: Taman Bunga Indah (setelah 1 jam pendakian)</Text>
                  <Text>Pos 2: Bukit Panorama (setelah 2 jam pendakian)</Text>
                  <Text>Pos 3: Puncak Batu (setelah 4 jam pendakian)</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 17, marginBottom: 8 }}>Estimasi Waktu</Text>
            <View style={{ display: 'flex', flexDirection :'column', gap: 8 }}>
              <View style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Text style={{ fontSize : 15, fontWeight: 'bold' }}>Estimasi Waktu Pendakian</Text>
                <Text>Sekitar 6-7 jam</Text>
              </View>
              <View style={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                <Text style={{ fontSize : 15, fontWeight: 'bold' }}>Detail</Text>
                <View>
                  <Text>Basecamp Mawar ke Pos 1: 1 jam</Text>
                  <Text>Pos 1 ke Pos 2: 2 jam</Text>
                  <Text>Pos 2 ke Pos 3: 2 jam</Text>
                  <Text>Pos 3 ke Puncak: 1-2 jam</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 17, marginBottom: 8 }}>Lokasi</Text>
            <View>
                <MapView 
                style={styles.map}
                region={initial_places}
                showsUserLocation
              >
                <Marker coordinate={initial_places} title="Basecamp Mawar"  />
              </MapView>
            </View>
          </View>
        </View>
      </SafeAreaView>

      </ScrollView>

    </View>
  )
}

export default InfoRute

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  wrapper: {
    margin: 20,
    // borderWidth: 1
  },
  map: 
  {
    width: '100%',
    height: '70%',
    borderRadius: 20
  }
})