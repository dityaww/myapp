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
import { COLORS, SIZES } from "../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';

const EditProfile = ({ navigation }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
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
    })
    .catch((err) => console.log("error-req", err.response.data))
  }

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   delete result.cancelled;

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);

  //     const apiUrl = 'http://62.72.24.89:5000/user/updateavatar/'
  //     const formData = new FormData()
  //     const fileName = result.assets[0].uri.split('/').pop()

  //     formData.append('media', {
  //       uri: result.assets[0].uri,
  //       type: result.assets[0].type,
  //       name: fileName
  //     })

  //     axios.post(apiUrl, formData, {
  //       headers: {
  //         'authorization': `${selector.token}`,
  //         'Content-Type': 'multipart/form-data'
  //       },
  //     }).then((response) => console.log(response.data.data)).catch((error) => {
  //       console.log("API errors: ", error);
  //     })
  //   }

  //   console.log(result);
  // };

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
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#f97316', paddingVertical: 6, paddingHorizontal: 10, display: 'flex', alignItems: 'center', width: 120, borderRadius: 20 }}>
              <Text style={{ color: "#ea580c", fontWeight: 'bold' }}>{kodePendaki || '-'}</Text>
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
            underlayColor="#818cf8"
            style={styles.btnEdited}
          >
            <View>
              <Text style={{ color: "#fff", fontFamily: "bold", textTransform: 'uppercase' }}>Simpan</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
