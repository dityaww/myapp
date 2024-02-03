import { View, Text, TextInput, Pressable, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';
import { Localization } from 'expo-localization';
import Toast from 'react-native-toast-message'
import { postReservasiSuccess } from '../../../redux/Reservasi/createreservasiSlice';

const InfoReservasi = ({ route, navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;
  const idGunung = route.params?.idMount;

  console.log("id-gunung", idGunung);

  const [postData, setPostData] = useState(null)
  
  // date-picker
  const [date, setDate] = useState(new Date());
  const [hikeDate, setHikeDate] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  // data-inputan
  const [durasiPendakian, setDurasiPendakian] = useState()
  const [total, setTotal] = useState(0)
  const [jmlPendaki, setJmlPendaki] = useState('')
  const [formatIDR, setFormatIDR] = useState()

  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const confirmIOSDate = () => {
    const formatDate = moment(date).format('DD-MM-YYYY')
    setHikeDate(formatDate)
    toggleDatePicker()
  }

  const onChange = ({ type }, selectedDate, e) => {
    if (type == 'set') {
      const currentDate = selectedDate
      const formattedDate = moment(currentDate).format('DD-MM-YYYY')
      setDate(currentDate)

      if(Platform.OS === 'android'){
        toggleDatePicker()
        setHikeDate(formattedDate)
      }
    } else{
      toggleDatePicker()
    }
  }

  useEffect(() => {
    if(jmlPendaki !== ''){
      const convToNum = Number(jmlPendaki)
      setTotal(convToNum * 20000)
    } else{
      setTotal(0)
    }
  }, [jmlPendaki])

  useEffect(() => {
    const formattedCurrency = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(parseFloat(total));

    setFormatIDR(formattedCurrency)
  }, [total])

  useEffect(() => {
    if(postData !== null){
      console.log("sudah post");

      navigation.navigate({
        name: 'AddAnggota',
        params: { idReservasi: postData._id }
      })
    }
  }, [postData])
  

  console.log(postData);

  const submit = () => {
    if(selector.token !== null){
      const data = {
        jumlah_pendaki: Number(jmlPendaki),
        tanggal_pendakian: hikeDate,
        durasi_pendakian: durasiPendakian,
        total: total
      }

      axios.post(`${apiUrl}/reservasi/booking/${idGunung}`, data, {
        headers: {
          'Authorization': selector.token
        }
      }).then((res) => {
        // console.log('resp:', res.data)
        dispatch(postReservasiSuccess(res.data))
        setPostData(res.data.data)
      }).catch((err) => {
        console.log("error-req", err.response.data)
        Toast.show({
          type: 'error',
          text1: 'Gagal melakukan reservasi',
        });
      })

      console.log('submited!');
    } else{
      // alert('kamu belum login')
      Toast.show({
        type: 'error',
        text1: 'Anda Belum Login!',
      });
    }
  }

    return (
      
      <View style={{ paddingVertical: 20, paddingHorizontal: 10, flex: 1, flexDirection: 'column', gap: 16, backgroundColor: '#fff'}}>
        {/* <Text>Reservasi</Text> */}        
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Text style={{ color: '#404040' }}>Objek Wisata</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Gunung Ungaran via Mawar</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Text style={{
            color: '#404040',
            fontSize: 14,
            fontFamily: 'regular'
            }}>Jumlah Hari Pendakian
          </Text>
          <View style={{ borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10}}>
            <Picker
                selectedValue={durasiPendakian}
                onValueChange={(itemValue, itemIndex) =>
                  setDurasiPendakian(itemValue)
                }
                >
                <Picker.Item label="1 hari" value="1 hari" />
                <Picker.Item label="2 hari" value="2 hari" />
                <Picker.Item label="3 hari" value="3 hari" />
                <Picker.Item label="4 hari" value="4 hari" />
            </Picker>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Text style={{
              color: '#404040',
              fontSize: 14,
              fontFamily: 'regular'
            }}>Jumlah Pendaki</Text>
            <TextInput 
              label={"rombongan"} 
              placeholder={"Masukkan jumlah rombongan"} 
              style={{ borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12, fontSize: 16 }}
              keyboardType='numeric'
              onChangeText={setJmlPendaki}
              />
          </View>
        </TouchableWithoutFeedback>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Text style={{
            color: '#404040',
            fontSize: 14,
            fontFamily: 'regular'
          }}>Tanggal Pendakian</Text>

          <Pressable onPress={toggleDatePicker} style={{ paddingHorizontal: 20, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <TextInput
                style={{ borderColor: 'gray',  color: '#404040'}}
                placeholder="Pilih tanggal"
                value={hikeDate}
                onChangeText={setHikeDate}
                editable={false}
              />
            
              {showPicker && (
                <DateTimePicker
                  mode='date'
                  display='spinner'
                  value={date}
                  onChange={onChange}
                  style={{ height: 120, marginTop: -10 }}
                />
              )}

              {showPicker && Platform.OS === 'ios' && (
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                  <TouchableOpacity onPress={toggleDatePicker} style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmIOSDate} style={{ backgroundColor: '#6366F1', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </Pressable>
      </View>




        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Text style={{
              color: '#404040',
              fontSize: 14,
              fontFamily: 'regular'
            }}>Total</Text>
          
          <Text
            style={{ borderWidth: 1, borderColor: '#6ee7b7',  color: '#059669', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, fontWeight: 'bold' }}
          >{formatIDR}</Text>
        </View>

        <Pressable onPress={submit} style={{ backgroundColor: '#6366F1', display: 'flex', alignItems: 'center', padding: 14, borderRadius: 10}}>
          <Text style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>reservasi sekarang</Text>
        </Pressable>

      
        <Toast />
      </View>
  )
}

export default InfoReservasi