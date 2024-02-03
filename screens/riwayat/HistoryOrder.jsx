import { StyleSheet, Text, View, FlatList, Pressable, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants';
import moment from 'moment/moment'

const HistoryOrder = ({ navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [dataHistory, setDataHistory] = useState([])
  const [idDetail, setIdDetail] = useState()

  const selector = useSelector((state) => state.auth)

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${apiUrl}/order/history`, {
        headers: {
          'Authorization': selector.token
        }
      }).then((res) => {
        setDataHistory(res.data.data)
      }).catch((err) => {
        alert('error get history!')
        console.log(err.response.status);
      })
    }, 1000);
  }, [dataHistory])
  

  const renderItem = ({ item }) => (
    <View style={styles.components}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        <View  style={{ top: 0, right: 0, position: 'absolute', backgroundColor: item.status_pembayaran === 'pending' ? '#a3a3a3' : '#10B981', paddingHorizontal: 20, paddingTop: 3, paddingBottom: 5, borderRadius: 20 }}>
          <Text style={{ fontFamily: 'bold', color: '#fff' }}>{item.status_pembayaran}</Text>
        </View>

        <View>
          <Text style={{ fontFamily: 'bold', fontSize: 20 }}>Gunung Ungaran</Text>
          <Text>via Mawar</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <View style={{ borderWidth: 1, borderColor: '#ef4444', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 8  }}>
            <Text style={{ color: 'red', fontFamily: 'bold' }}>belum check-in</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#ef4444', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 8  }}>
            <Text style={{ color: 'red', fontFamily: 'bold' }}>belum check-out</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'regular', fontStyle: 'italic' }}>metode pembayaran</Text>
            <Text style={{ color: 'black', fontFamily: 'bold' }}>{item.metode_pembayaran}</Text>
          </View>
          
          <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'regular', fontStyle: 'italic' }}>dibuat pada</Text>
            <Text style={{ color: 'black', fontFamily: 'bold' }}>{moment(item.createdAt).format('DD-MM-YYYY')}</Text>
          </View>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Pressable onPress={() => navigation.navigate({
            name: 'HistoryDetail',
            params: { idDetail: item._id }
          })} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#6366f1' }}>
            <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#4f46e5' }}>detail</Text>
          </Pressable>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#4f46e5', padding: 12, borderRadius: 8 }}>
            <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#fff' }}>subtotal</Text>
            <Text style={{ fontFamily: 'bold', color: '#fff' }}>{new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(item.total)}</Text>
          </View>
        </View>

      </View>
    </View>
  )

  return (
    <View style={styles.container} >
      <View style={{}}>
        <View style={styles.wrapper}>
          <FlatList
            data={dataHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />      
        </View>
      </View>
    </View>
  )
}

export default HistoryOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    padding: 20,
    paddingBottom: 100,
    height: Dimensions.get("screen").height
  },
  components: {
    borderWidth: 1,
    padding: 18,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    marginBottom: 20,
  }
})