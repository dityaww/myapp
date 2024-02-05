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
          "Authorization": selector.token
        }
      }).then((res) => {
        setDataHistory(res.data.data)
      }).catch((err) => {
        alert('error get history!')
        console.log(err.response.status);
      })
    }, 1000);
  }, [dataHistory])

// console.log(dataHistory);

  const batalReservasi = (id) => {
    let data = ''

    const response = axios.put(`${apiUrl}/order/cancel/${id}`, data, {
      headers: {
        "Authorization": selector.token
      }
    })

    response.then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err.response);
    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.components}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        <View  style={{ top: 0, right: 0, position: 'absolute', backgroundColor: item.status_pembayaran === 'pending' ? '#e5e5e5' : item.status_pembayaran === 'cancelled' ? '#e11d48' : '#0F766E', paddingHorizontal: 20, paddingTop: 3, paddingBottom: 5, borderRadius: 20 }}>
          <Text style={{ fontFamily: 'bold', color: item.status_pembayaran === 'pending' ? '#525252' : '#fff' }}>{item.status_pembayaran}</Text>
        </View>

        <View>
          <Text style={{ fontFamily: 'bold', fontSize: 20 }}>Gunung Ungaran</Text>
          <Text>via Mawar</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <View style={{ borderWidth: 1, borderColor: '#7c3aed', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 8  }}>
            <Text style={{ color: '#6d28d9', fontFamily: 'bold' }}>{item.check_in !== null ? moment(item.check_in).format("LLL") : 'belum check-in'}</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#7c3aed', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 8  }}>
            <Text style={{ color: '#6d28d9', fontFamily: 'bold' }}>{item.check_out !== null ? moment(item.check_out).format("LLL") : 'belum check-out'}</Text>
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

        {/* {console.log('id-order', item._id)} */}

        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <View style={{ display: 'flex', gap: 3, flexDirection: 'row' }}>
            <Pressable onPress={() => batalReservasi(item._id)} disabled={item.status_pembayaran === 'cancelled' ? true : false} style={{ display: 'flex', width: '50%', flexDirection: 'row', justifyContent: 'center', padding: 8, borderRadius: 8, backgroundColor: item.status_pembayaran === 'cancelled' ? '#a3a3a3' : '#ef4444' }}>
              <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#fff' }}>batal</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate({
              name: 'HistoryDetail',
              params: { idDetail: item._id }
            })} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '50%', padding: 8, borderRadius: 8, backgroundColor: '#0D9488' }}>
              <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#fff' }}>detail</Text>
            </Pressable>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0F766E', padding: 16, borderRadius: 8 }}>
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