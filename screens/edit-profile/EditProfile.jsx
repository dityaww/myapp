import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./edit.style";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message'

const EditProfile = ({ navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [dataUsers, setDataUsers] = useState([])
  const [nama, setNama] = useState()
  const [email, setEmail] = useState()
  const [kodePendaki, setKodePendaki] = useState()
  const [alamat, setAlamat] = useState()
  const [noHP, setNoHP] = useState()
  const [parentNumber, setParentNumber] = useState()

  // const dispatch = useDispatch()
  const selector = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://62.72.24.89:5000/user/getmyprofile", {
        headers: { "Authorization": `${selector.token}` },
      })
      .then((response) => {
        setDataUsers(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setNama(dataUsers.name)
    setEmail(dataUsers.email)
    setKodePendaki(dataUsers.code)

    if(dataUsers.phone === 'false'){
      setNoHP('-')
    } else{
      setNoHP(dataUsers.phone)
    }

    if(dataUsers.address === 'false'){
      setAlamat('-')
    } else{
      setAlamat(dataUsers.address)
    }

    if(dataUsers.parent_number === 'false'){
      setParentNumber('-')
    } else{
      setParentNumber(dataUsers.parent_number)
    }

  }, [dataUsers])

  console.log(dataUsers);

  const onSubmit = () => {
    console.log("submitted!");

    const data = {
      name: nama,
      address: alamat,
      phone: noHP,
      parent_number: parentNumber
    }

    axios.put(`${apiUrl}/user/editprofile`, data, {
      headers: {
        'Authorization': selector.token
      }
    }).then((res) => {
      console.log('resp:', res.data)
      console.log('sukses edit data!')
      Toast.show({
        type: 'success',
        text1: 'Berhasil melakukan edit data',
      });
    })
    .catch((err) => console.log("error-req", err.response.data))
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.appBar}>

        <View style={styles.inputFields}>
          {/* Fields Name */}
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Text style={styles.fieldsTitle}>Kode Pendaki</Text>
              <Text style={{ fontStyle: 'italic', fontFamily: 'regular', fontSize: 10, color: '#262626', color: 'red' }}>(not editable)</Text>
            </View>
            <View style={{ marginTop: 10, borderWidth: 2, borderColor: '#14B8A6', paddingVertical: 6, paddingHorizontal: 10, display: 'flex', alignItems: 'center', width: 120, borderRadius: 20 }}>
              <Text style={{ color: "#0D9488", fontWeight: 'bold' }}>{kodePendaki || '-'}</Text>
            </View>
          </View>
          
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Text style={styles.fieldsTitle}>Nama</Text>
              <Text style={{ fontStyle: 'normal', fontFamily: 'regular', fontSize: 10, color: '#262626', color: 'red' }}>*</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan Nama Lengkap"
              value={nama}
              editable={true}
              onChangeText={(nama) => setNama(nama)}
            />
          </View>

          {/* Fields Email */}
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Text style={styles.fieldsTitle}>Email</Text>
              <Text style={{ fontStyle: 'italic', fontFamily: 'regular', fontSize: 10, color: '#262626', color: 'red' }}>(not editable)</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan Email"
              value={email}
              editable={false}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          {/* Fields Phone Number */}
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Text style={styles.fieldsTitle}>No HP</Text>
              <Text style={{ fontStyle: 'normal', fontFamily: 'regular', fontSize: 10, color: '#262626', color: 'red' }}>*</Text>
            </View>

            <TextInput 
              style={styles.textInput} 
              placeholder="Masukkan Nomor HP" 
              value={noHP}
              editable={true}
              onChangeText={(nohp) => setNoHP(nohp)}
            />
          </View>
         
          <View>
            <Text style={styles.fieldsTitle}>No HP Orangtua</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="Masukkan Nomor HP Orangtua" 
              value={parentNumber}
              editable={true}
              onChangeText={(parentNumber) => setParentNumber(parentNumber)}
            />
          </View>
          
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              <Text style={styles.fieldsTitle}>Alamat</Text>
              <Text style={{ fontStyle: 'normal', fontFamily: 'regular', fontSize: 10, color: '#262626', color: 'red' }}>*</Text>
            </View>
            <TextInput 
              style={styles.textInput} 
              placeholder="Masukkan Alamat" 
              value={alamat}
              editable={true}
              onChangeText={(alamat) => setAlamat(alamat)}
              />
          </View>

          <TouchableHighlight
            onPress={onSubmit}
            underlayColor="#0F766E"
            style={styles.btnEdited}
          >
            <View>
              <Text style={{ color: "#fff", fontFamily: "bold", textTransform: 'uppercase' }}>Simpan</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default EditProfile;
