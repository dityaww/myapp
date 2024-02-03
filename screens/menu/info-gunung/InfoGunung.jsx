import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import map from '../../../assets/icons/map-marker.png'
import SvgUri from 'react-native-svg';
import LottieView from "lottie-react-native";
import { useRef } from 'react';

const InfoGunung = ({ route }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;
  const [detailGunung, setDetailGunung] = useState([])
  const idGunung = route.params?.idMount;

  const [currency, setCurrency] = useState(0)
  const [formatNum, setFormatNum] = useState()
  
  console.log(idGunung);

  const [img, setImg] = useState(require('../../../assets/gunung/gunung-1.png'));
 
  const [desc, setDesc] = useState({
    par1: 'Gunung Ungaran memiliki ketinggian sekitar 2.050 mdpl, dan termasuk ke dalam Gunung Berapi namun kondisinya sekarang sedang tidak aktif.',
    par2: 'Gunung Ungaran juga memiliki sumber mata air panas, maka tak heran jika di sekitar Gunung Ungaran banyak terdapat pemandian air panas.'
  })
  const [fasilitas, setFasilitas] = useState(['Area Parkir', 'Warung', 'Toilet', 'Pusat Informasi'])
 
  const navigation = useNavigation()
  const animation = useRef(null)
  
  useEffect(() => {
    setTimeout(() => {
      axios.get(`${apiUrl}/mount/detail/${idGunung}`).then((res) => {
        setDetailGunung(res.data.data)
        console.log(res.data.data);
      }).catch((err) => {
        console.log("error:", err.response.status);
      })
    }, 500);
  }, [])

  useEffect(() => {
    const formattedCurrency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(detailGunung?.ticket_price);

    setCurrency(formattedCurrency)
    
    if (detailGunung.height !== undefined && detailGunung.height !== null) {
      setFormatNum(detailGunung?.height.toLocaleString())
    }
  }, [detailGunung])
  
  
  return (
    <View style={styles.container}>
      {/* <Text>InfoGunung</Text> */}
      {detailGunung.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: 300, height: 300 }}
            source={require('../../../assets/fix/loading.json')}
          />
        </View>
        ) : (
          <>
            
          <Image 
            source={img}
            style={{width: "100%", height: 300}}
          />
          <View style={styles.contentWrapper}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Title */}
              <View style={styles.title}>
                <Text style={styles.titleStyle}>Gunung {detailGunung?.name}</Text>
              </View>

              {/* SubTitle */}
              <View style={styles.subtitle}>
                <Text style={styles.subtitleStyle}>via {detailGunung?.basecamp}</Text>
              </View>

              {/* Location n Peak */}
              <View style={styles.dataGunung}>
                <View style={styles.location}>
                  <Image 
                    source={map}
                    style={{width: 28, height: 28, tintColor: '#f43f5e'}}
                  />
                  <Text style={{ fontFamily: 'regular' }}>Ungaran, Semarang</Text>
                </View>
                <View style={[styles.peak]}>
                  <Image 
                    source={require('../../../assets/icons/mount.png')}
                    style={{width: 28, height: 28, tintColor: '#3b82f6'}}
                  />
                  <Text style={{ fontFamily: 'regular' }}>{formatNum} mdpl</Text>
                </View>
                <View style={[styles.peak, { display: 'flex', gap: 12 }]}>
                  <Image 
                    source={require('../../../assets/icons/tiket.png')}
                    style={{width: 28, height: 30 }}
                  />
                  <View style={{ display: 'flex', gap: 8, flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'bold', color: '#047857' }}>{currency}</Text>
                    <Text style={{ fontStyle: 'italic', color: '#a3a3a3' }}>belum termasuk biaya parkir</Text>
                  </View>
                </View>
              </View>

              {/* Desc */}
              <View style={styles.description}>
                <Text style={styles.textDescription}>{detailGunung?.description}</Text>
                {/* <Text style={styles.textDescription}>{desc.par2}</Text> */}
                <Text style={[styles.textDescription, {fontFamily: 'bold', marginTop: 5}]}>
                  Fasilitas:
                </Text>
                {fasilitas.map((items, idx) => (
                  <View key={idx}>
                    <Text style={styles.textDescription}>- {items}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </>

        )}
    </View>
  )
}

export default InfoGunung

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
  contentWrapper: {
    backgroundColor: '#fff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30, 
    paddingVertical: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0, 
    height: 580
  },
  title: {
    marginHorizontal: 20,
    // borderWidth: 1
  },
  titleStyle: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'bold',
    textTransform: 'capitalize'
  },
  subtitle: {
    // borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 5
  },
  subtitleStyle: {
    color: '#a3a3a3',
    fontSize: 15,
    fontFamily: 'regular'
  },
  dataGunung: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 20,
    marginTop: 15,
    flexWrap: 'wrap'
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    // borderWidth: 1
  },
  peak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    // borderWidth: 1
  },
  description: {
    marginHorizontal: 20, 
    gap: 7,
    marginTop: 22
  },
  btnBooking: {
    display: 'flex',
    marginHorizontal: 20,
    width: 120,
    justifyContent: 'center'
  },
  textDescription: {
    fontSize: 16,
    fontFamily: 'regular',
    lineHeight: 28,
    textAlign: 'justify'
  }
})