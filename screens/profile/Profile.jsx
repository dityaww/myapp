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

import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;

const Profile = ({ navigation }) => {
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

  // const hapusPostingan = (idKonten) => {
  //   axios.get(`http://62.72.24.89:5000/post/delpost/${idKonten}`, {
  //     headers: {
  //       "Authorization": selector.token
  //     }
  //   }).then((response) => {
  //     console.log("berhasil hapus");
  //     console.log("berhasil hapus, ", response);
  //   }).catch((error) => {
  //     console.log("gagal hapus");
  //     console.log("gagal hapus, ", error);
  //   })
  // }

  useEffect(() => {
    if (selector.token !== null) {
      axios.get(`${apiUrl}/user/getmyprofile`, {
        headers: {
          'Authorization': selector.token
        }
      }).then((response) => {
        setHaveAccount(true);
        setUserData(response.data.data)
        // setPostData(response.data.data.posts)
      })
    } else {
      setHaveAccount(false);
    }
  }, [selector, userData]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={styles.container}>
        {haveAccount ? (
          <>
            <View style={{ height: screenH }}>
              {/* <Text>Profil Masuk!</Text> */}
              <View style={{ display: 'flex', alignItems: 'center', marginVertical: 20}}>
                <Image source={require('../../assets/fix/icon/avatar.png')} style={{ width: 140, height: 140, backgroundColor:'blue' }}/>
                <Text style={{ fontFamily: 'bold', fontSize: 20, textTransform: 'capitalize' }}>{userData?.name}</Text>
              </View>
              <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#d4d4d4' }}></View>
              
              <View style={{ display: 'flex', gap: 16, margin: 20 }}>
                <View style={{ backgroundColor: '#e5e5e5', borderRadius: 8 }}>
                  <Pressable onPress={() => navigation.navigate('Edit')} style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/edit-profil.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#404040' }}>Edit Profil</Text>
                  </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('History')} style={{ backgroundColor: '#e5e5e5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/riwayat.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#404040' }}>Riwayat Transaksi</Text>
                  </View>
                </Pressable>
                <View style={{ backgroundColor: '#e5e5e5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/cart.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#404040' }}>Keranjang</Text>
                  </View>
                </View>
                <Pressable onPress={handleLogout} style={{ backgroundColor: '#e5e5e5', borderRadius: 8 }}>
                  <View style={{ display: 'flex', gap: 14, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Image source={require('../../assets/fix/icon/menu/logout.png')} style={{ width: 24, height: 24 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#404040' }}>Logout</Text>
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
