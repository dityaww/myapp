import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Constants from 'expo-constants';
import axios from 'axios'
import list from "../../../assets/fix/icon/menu/list.png"

const SyaratPendakian = () => {
  const apiUrl = Constants.expoConfig.extra.API_URL;
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${apiUrl}/regulation/alldata`)
      return response.data
    }

    fetch().then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err.response.status);
    })

  }, [data])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 14 }}>Syarat Pendakian</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.length !== 0 && data.map((items, id) => (
            <View key={id} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'flex-start' }}>
              <Image source={list} style={{ width: 8, height: 8, marginTop: 5 }}/>
              <Text style={{ fontSize: 16 }}>{items.rule}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default SyaratPendakian

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  wrapper: {
    margin: 20,
    // borderWidth: 1
  }
})