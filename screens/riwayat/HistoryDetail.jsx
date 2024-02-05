import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

const HistoryDetail = ({ route }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const getIdRiwayat = route.params.idDetail;
  const selector = useSelector((state) => state.auth)
  
  const screenH = Dimensions.get("window").height

  const [ dataDetail, setDataDetail ] = useState(null)

//   console.log(getIdRiwayat);

  useEffect(() => {
    axios.get(`${apiUrl}/order/detail/${getIdRiwayat}`, {
        headers: {
            "Authorization": selector.token
        }
    }).then((res) => {
        setDataDetail(res.data.data)
    }).catch((err) => {
        console.log(err.response.status);
    })
  }, [dataDetail])

//   console.log(dataDetail.check_in);

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'bold', fontSize: 16, textTransform: 'capitalize' }}>{item.name}</Text>
            </View>
            <View>
                <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{item.address}</Text>
                <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{item.email}</Text>
                <Text style={{ fontFamily: 'bold', fontSize: 14 }}>{item.phone}</Text>
            </View>
        </View>
    </View>
  )

  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            {dataDetail !== null && (
                <View style={styles.konten}>
                <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: dataDetail?.status_pembayaran === 'pending' ? '#e5e5e5': '#059669', paddingHorizontal: 18, paddingVertical: 4, borderRadius: 20, margin: 16 }}>
                    <Text style={{ color: dataDetail?.status_pembayaran === 'pending' ? '#525252': '#fff', fontFamily: 'semibold' }}>{dataDetail?.status_pembayaran}</Text>
                </View>
                
                <View>
                    <Text style={{ textTransform: 'capitalize', color: '#404040', fontSize: 20, fontFamily: 'bold' }}>gunung ungaran</Text>
                    <Text style={{ fontFamily: 'regular' }}>via mawar</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Text style={{ borderRadius: 14, borderColor: '#22c55e', color: '#059669', fontFamily: 'bold', paddingHorizontal: 14, paddingVertical: 4, borderWidth: 2 }}>{dataDetail?.jumlah_pendaki} pendaki</Text>
                  <Text style={{ borderRadius: 14, borderColor: '#0ea5e9', color: '#0284c7', fontFamily: 'bold', paddingHorizontal: 14, paddingVertical: 4, borderWidth: 2 }}>{dataDetail?.durasi_pendakian}</Text>
                </View>


                <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'regular', fontStyle: 'italic' }}>metode pembayaran</Text>
                        <Text style={{ color: 'black', fontFamily: 'bold' }}>{dataDetail?.metode_pembayaran}</Text>
                    </View>
                    
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'regular', fontStyle: 'italic' }}>dibuat pada</Text>
                        <Text style={{ color: 'black', fontFamily: 'bold' }}>{moment(dataDetail?.createdAt).format('DD-MM-YYYY')}</Text>
                    </View>
                </View>
                
                <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <View style={{ borderWidth: 2, borderColor: '#7c3aed', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20  }}>
                        <Text style={{ color: '#6d28d9', fontFamily: 'bold' }}>{dataDetail?.check_in !== null ? moment(dataDetail.check_in).format("LLL") : 'belum check-in'}</Text>
                    </View>
                    <View style={{ borderWidth: 2, borderColor: '#7c3aed', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20  }}>
                        <Text style={{ color: '#6d28d9', fontFamily: 'bold' }}>{dataDetail?.check_out !== null ? moment(dataDetail.check_out).format("LLL") : 'belum check-out'}</Text>
                    </View>
                </View>
                
                    
                <FlatList
                    data={dataDetail?.pendaki}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.code}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                />  
                </View>
            )}
        </View>
    </View>
  )
}

export default HistoryDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        margin: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        // height: Dimensions.get("window").height,
    },
    konten: {
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        height: Dimensions.get('screen').height - 150
    }
})