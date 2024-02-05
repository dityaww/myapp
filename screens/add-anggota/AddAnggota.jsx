import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';
import { useEffect } from 'react';
import { getReservasiSuccess } from '../../redux/Reservasi/reservasiSlice';
import moment from 'moment/moment';

const AddAnggota = ({ route, navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [dataReservasi, setDataReservasi] = useState([])
  const [idReservasi, setIdReservasi] = useState('')
  const [detailPendaki, setDetailPendaki] = useState(null)
  const [kodePendaki, setKodePendaki] = useState()
  
  const selector = useSelector((state) => state.auth);
  const selectorReservasi = useSelector((state) => state.reservasi)
  const selectorIdReservasi = useSelector((state) => state.create.data._id)

  // console.log("id-reservasi", selectorIdReservasi);
  
  const dispatch = useDispatch()

  const [data, setData] = useState({
    jumlah_pendaki: 1,
    kode_pendaki: [],
  });

  const checkKodePendaki = (kode) => {
    axios.get(`${apiUrl}/reservasi/cekuser/?code=${kode}`).then((res) => {
      setDetailPendaki(res.data.data)
      alert("kode ada!")
    }).catch((err) => {
      alert('kode tidak ada!')
    })
  }

  const handleAddInput = () => {
    if (data.jumlah_pendaki < dataReservasi.jumlah_pendaki) {
      setData({
        ...data,
        kode_pendaki: [...data.kode_pendaki, ''],
        jumlah_pendaki: data.jumlah_pendaki + 1
      });
    }
  };

  const handleInputChange = (text, index) => {
    const updatedCodes = [...data.kode_pendaki];
    updatedCodes[index] = text;
    setData({
      ...data,
      kode_pendaki: updatedCodes,
    });
  };

  const handleRemoveInput = (index) => {
    const updatedCodes = [...data.kode_pendaki];
    updatedCodes.splice(index, 1);
    setData({
      ...data,
      kode_pendaki: updatedCodes,
    });
  };

  useEffect(() => {
    axios.get(`${apiUrl}/reservasi/getdata/${idReservasi}`, {
      headers: {
        'Authorization': selector.token
      }
    }).then((res) => {
      dispatch(getReservasiSuccess(res.data))
      // console.log(res.data.data);
    }).catch((err) => {
      console.log(err.response.status);
    })
  }, [dataReservasi])

  // console.log("data", data);

  useEffect(() => {
    if(selector.token !== null){
      setDataReservasi(selectorReservasi.data)
      setIdReservasi(selectorIdReservasi)
    }
  }, [selectorIdReservasi, selectorReservasi])

  useEffect(() => {
    setKodePendaki(data.kode_pendaki)
  }, [data])
  
  const handleSubmit = () => {
    let data = {
      code_anggota_baru: kodePendaki
    }

    console.log(data);

    if(dataReservasi.jumlah_pendaki > 1){
      // alert('pindah ke cekout')
      axios.post(`${apiUrl}/reservasi/addanggota/${idReservasi}`, data, {
        headers: {
          'Authorization': selector.token
        }
      }).then((res) => {
        alert('sukses tambah data anggota')

        navigation.navigate({
          name: 'checkout'
        })

      }).catch((err) => {
        if(err.response.status === 400){
          alert('user ini sudah diinputkan')

          // navigation.navigate({
          //   name: 'checkout'
          // })
        } else{
          alert('gagal tambah data anggota')
        }
        console.log(err.response.status);
      })
    };

    if(dataReservasi.jumlah_pendaki === 1){
      alert('pindah ke cekoout')
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          {dataReservasi.length !== 0 ? (
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 20 }}>
              <View style={{
                padding: 18,
                display: 'flex', 
                flexDirection: 'column', 
                gap: 10
              }}>
                <View>
                  <Text style={{ color: '#404040', fontSize: 20, fontFamily: 'bold', textTransform: 'capitalize'}}>Gunung {dataReservasi?.mount?.gunung}</Text>
                  <Text style={{ color: "#404040" }}>via {dataReservasi?.mount?.basecamp}</Text>
                </View>
                
                <View>
                  <Text style={{ fontStyle: 'italic' }}>tanggal pendakian {moment(dataReservasi?.tanggal_pendakian).format('DD-MM-YYYY')}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  <Text style={{ borderRadius: 14, borderColor: '#22c55e', color: '#059669', fontFamily: 'bold', paddingHorizontal: 18, paddingVertical: 4, borderWidth: 2 }}>{dataReservasi?.jumlah_pendaki} pendaki</Text>
                  <Text style={{ borderRadius: 14, borderColor: '#0ea5e9', color: '#0284c7', fontFamily: 'bold', paddingHorizontal: 18, paddingVertical: 4, borderWidth: 2 }}>{dataReservasi?.durasi_pendakian}</Text>
                </View>
                
                <View style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Text style={{ fontFamily: 'regular', color: '#404040', fontSize: 12 }}>Ketua Rombongan</Text>
                  <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'bold', fontSize: 18, textTransform: 'capitalize' }}>{dataReservasi?.userBoking?.name}</Text>
                      <View style={{ borderRadius: 20, backgroundColor: '#0284c7' }}>
                        <Text style={{  color: '#fff', fontFamily: 'bold', paddingHorizontal: 20, paddingVertical: 5 }}>{dataReservasi?.userBoking?.address}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontFamily: 'regular', fontSize: 14, fontStyle: 'italic' }}>{dataReservasi?.userBoking?.email}</Text>
                      <Text style={{ fontFamily: 'bold', fontSize: 14 }}>{dataReservasi?.userBoking?.phone}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#d4d4d4', marginVertical: 5 }}></View>
                
                <View style={{ marginVertical: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
              
                  <Pressable onPress={handleAddInput} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ paddingHorizontal: 28, paddingVertical: 10, borderRadius: 20, backgroundColor: '#0D9488' }}>
                      <Text style={{ color: '#fff' }}>Tambah Anggota</Text>
                    </View>
                  </Pressable>

                  {data.kode_pendaki.map((value, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    
                      <TextInput
                        style={{ borderWidth: 1, padding: 10, borderColor: '#e5e5e5', marginBottom: 10, flex: 1 }}
                        placeholder={`Masukkan kode pendaki`}
                        value={value}
                        onChangeText={(text) => handleInputChange(text, index)}
                      />

                      <Pressable style={{ borderWidth: 1, borderColor: 'red', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 8 }} onPress={() => checkKodePendaki(data.kode_pendaki[index])}>
                        <Text style={{ color: 'red', fontFamily: 'bold' }}>check</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>

              </View>

              <View style={{ padding: 24, backgroundColor: '#0F766E', borderBottomEndRadius: 14, borderBottomStartRadius: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#fff', fontStyle: 'italic' }}>Subtotal</Text>
                  <Text style={{ color: '#fff', fontFamily: 'bold' }}>{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(parseFloat(dataReservasi?.pembayaran?.total_tiket))}</Text>
                </View>
                <Pressable onPress={handleSubmit} style={{ borderRadius: 14, backgroundColor: '#fff', display: 'flex', alignItems: 'center', paddingVertical: 16 }}>
                  <Text style={{ textTransform: 'uppercase', color: '#0F766E', fontFamily: 'bold' }}>checkout</Text>
                </Pressable>
              </View>
            </View>
          ) : <Text>Tidak ada data</Text>}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default AddAnggota

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  wrapper: {
    // borderWidth: 1
    margin: 20
  }
})