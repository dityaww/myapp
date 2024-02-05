import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Constants from 'expo-constants';

const Checkout = ({ navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [ dataReservasi, setDataRerservasi] = useState()
  const [totalHarga, setTotalHarga] = useState()

  const selector = useSelector((state) => state.create)
  const selectorToken = useSelector((state) => state.auth)

  const idReservasi = selector.data._id

//   console.log(idReservasi);

  useEffect(() => {
    axios.get(`${apiUrl}/reservasi/getdata/${idReservasi}`, {
        headers: {
            "Authorization": selectorToken.token
        }
    }).then((res) => {
        setDataRerservasi(res.data.data)
    }).catch((err) => {
        console.log(err.response.status);
    })
  }, [dataReservasi])

  useEffect(() => {
    setTotalHarga(dataReservasi?.pembayaran?.total_tiket + dataReservasi?.pembayaran?.admin + dataReservasi?.pembayaran?.biaya_aplikasi)
    // console.log(totalHarga);
  }, [totalHarga, dataReservasi])

  const submit = () => {
    const data = ''

    axios.post(`${apiUrl}/reservasi/checkout/${idReservasi}`, data,  {
        headers: {
            "Authorization": selectorToken.token,
        }
    }).then((res) => {
        console.log('sukses post');
        navigation.navigate({
            name: 'Home'
        })
    }).catch((err) => {
        console.log(err.response.status);
        alert("sudah order")
        navigation.navigate({
            name: 'History'
        })
        // console.log(err.response);
    })
  } 

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'bold', fontSize: 16, textTransform: 'capitalize' }}>{item.name}</Text>
            </View>
            <View>
                <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{item.address === 'false' ? '-' : item.address}</Text>
                <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{item.email}</Text>
                <Text style={{ fontFamily: 'bold', fontSize: 14 }}>{item.phone}</Text>
            </View>
        </View>
    </View>
  )
  
  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.konten}>
                <View>
                    <Text style={{ textTransform: 'capitalize', color: '#404040', fontSize: 20, fontFamily: 'bold' }}>gunung {dataReservasi?.mount?.gunung}</Text>
                    <Text style={{ fontFamily: 'regular' }}>via {dataReservasi?.mount?.basecamp}</Text>
                </View>
                
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Text style={{ borderRadius: 14, borderColor: '#22c55e', color: '#059669', fontFamily: 'bold', paddingHorizontal: 18, paddingVertical: 4, borderWidth: 2 }}>{dataReservasi?.jumlah_pendaki} pendaki</Text>
                  <Text style={{ borderRadius: 14, borderColor: '#0ea5e9', color: '#0284c7', fontFamily: 'bold', paddingHorizontal: 18, paddingVertical: 4, borderWidth: 2 }}>{dataReservasi?.durasi_pendakian}</Text>
                </View>

                <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <Text style={{ fontFamily: 'regular', color: '#404040', fontSize: 12 }}>Ketua Rombongan</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'bold', fontSize: 16, textTransform: 'capitalize' }}>{dataReservasi?.userBoking?.name}</Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{dataReservasi?.userBoking?.address === 'false' ? '-' : dataReservasi?.userBoking?.address}</Text>
                      <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{dataReservasi?.userBoking?.email}</Text>
                      <Text style={{ fontFamily: 'bold', fontSize: 14 }}>{dataReservasi?.userBoking?.phone}</Text>
                    </View>
                  </View>
                </View>

                <FlatList
                    data={dataReservasi?.anggota_pendaki}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.code}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                />  

                <View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0D9488', padding: 12, borderRadius: 8 }}>
                        <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#fff' }}>subtotal</Text>
                        <Text style={{ fontFamily: 'bold', color: '#fff' }}>{new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                            }).format(Number(totalHarga))}</Text>
                    </View>
                </View>


                <Pressable onPress={submit}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#0F766E', padding: 16, borderRadius: 8 }}>
                        <Text style={{ textTransform: 'uppercase', fontFamily: 'bold', color: '#fff' }}>bayar</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }, 
    wrapper: {
        margin: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 12
    },
    konten: {
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    }
})