import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./profile.style";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";
import axios from "axios";
import camera from "../../assets/fix/icon/camera.png"

import * as ImagePicker from "expo-image-picker";
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;

const Profile = ({ navigation }) => {
  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
  const [haveAccount, setHaveAccount] = useState(false);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([])

  const screenW = Dimensions.get("window").width;
  const screenH = Dimensions.get("screen").height;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    delete result.cancelled;

    if (!result.canceled) {
      // setImage(result.assets[0].uri);

      const urlupdate = `${apiUrl}/user/updateavatar/`
      const formData = new FormData()
      const fileName = result.assets[0].uri.split('/').pop()

      formData.append('media', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: fileName
      })

      console.log(formData);

      axios.post(urlupdate, formData, {
        headers: {
          "Authorization": selector.token,
          "Content-Type": "multipart/form-data"
        },
      }).then((response) => {
        console.log(response.data.data)
        console.log("sukses");
      }).catch((error) => {
        if(error.response.status === 413){
          alert('file terlalu besar')
        }

        console.log("API errors: ", error);
      })
    }

    // console.log(result);
  };

  useEffect(() => {
    if (selector.token !== null) {
      axios.get(`${apiUrl}/user/getmyprofile`, {
        headers: {
          'Authorization': selector.token
        }
      }).then((response) => {
        setHaveAccount(true);
        setUserData(response.data.data)
        // setImage(response.data.data.avatar)
        // setPostData(response.data.data.posts)
      })
    } else {
      setHaveAccount(false);
    }
  }, [selector, userData]);

  useEffect(() => {
    if(userData.avatar !== false){
      // setImage(userData.avatar)
    }
  }, [image, userData])
  

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={styles.container}>
        {haveAccount ? (
          <>
            <View style={{ height: screenH }}>
              {/* <Text>Profil Masuk!</Text> */}
              <View style={{ display: 'flex', alignItems: 'center', marginVertical: 20}}>
                <View style={{ position: 'reetive' }}>
                  <Image source={{ uri: image }} style={{ width: 140, height: 140, borderRadius: 100 }}/>
                  <Pressable onPress={pickImage} style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Image source={camera} style={{ width: 40, height: 40 }}/>
                  </Pressable>
                </View>
                
                <Text style={{ fontFamily: 'bold', fontSize: 20, marginTop: 14, textTransform: 'capitalize' }}>{userData?.name}</Text>
              </View>
              
              
              <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#d4d4d4' }}></View>
              
              <View style={{ display: 'flex', gap: 16, margin: 20 }}>
                <View style={{ borderWidth: 1.5, borderColor: '#f5f5f5', borderRadius: 8 }}>
                  <Pressable onPress={() => navigation.navigate('Edit')} style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/edit-profil.png')} style={{ width: 28, height: 28 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#0F766E' }}>Edit Profil</Text>
                  </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('History')} style={{ borderWidth: 1.5, borderColor: '#f5f5f5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/riwayat.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#0F766E' }}>Riwayat Transaksi</Text>
                  </View>
                </Pressable>
                {/* <View style={{ backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/cart.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#0F766E' }}>Keranjang</Text>
                  </View>
                </View> */}
                <Pressable onPress={handleLogout} style={{ borderWidth: 1.5, borderColor: '#f5f5f5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/logout.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#0F766E' }}>Logout</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </>
        ) : (
          <View style={[styles.noAccount, {height: screenH}]}>
            <Image
              source={require("../../assets/fix/no-acc.png")}
              style={styles.imgNoAccount}
            />

            <Text style={{ marginBottom: 10 }}>Dont have Account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.btnLogin}
            >
              <Text style={{ color: "#ffffff" }}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
};

export default Profile;
