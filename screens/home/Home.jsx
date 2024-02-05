import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./home.style";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({navigation}) => {
  // const [activeFilter, setActiveFilter] = useState("All");
  const [dataPost, setDataPost] = useState([]);
  // const [isloading, setIsLoading] = useState(true);
  // const [dataLogin, setDataLogin] = useState()
  const [gambar, setGambar] = useState(
    'data:image/jpeg;base64,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'
  );
  const screenwidth = Dimensions.get("window").width;
  const screenH = Dimensions.get('window').height
  
  const data = [
    { id: 0, image: require('../../assets/fix//gunung/ungaran-01.jpeg') },
    { id: 1, image: require('../../assets/fix//gunung/ungaran-02.jpeg') },
    { id: 2, image: require('../../assets/fix//gunung/ungaran-03.jpeg') },
  ];

  const renderImageItem = ({ item }) => (
    <View>
      <Image source={item.image} style={{ height: 220,  width: screenwidth-20, borderRadius: 20, marginRight: 10  }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ margin: 10 }}>
          <StatusBar style="dark" />

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18 }}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: '300' }}>Let's</Text>
              <Text style={{ fontSize: 24, color: '#0D9488', fontWeight: '900' }}>Explore</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Pressable onPress={() => navigation.navigate({
                name: 'AddAnggota'
              })}>
                <View style={{ width: 34, height: 28 }}>
                  <Image source={require('../../assets/fix/icon/tiket-icon.png')} style={{ width: '100%', height: '100%' }}/>
                </View>
              </Pressable>
              <Image source={require('../../assets/fix/icon/avatar.png')} style={{ width: 48, height: 48 }}/>
            </View>
          </View>
          
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={data}
              renderItem={renderImageItem}
              keyExtractor={(item) => item.id}
              horizontal={true} // setel ke true untuk mendapatkan daftar gambar horizontal
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}

            />
          </View>

          <View style={{ display: 'flex', gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Menu</Text>
            <View style={{ flexDirection: 'row', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', height: screenH }}>
              <Pressable onPress={() => navigation.navigate({
                name: 'InfoDetailGunung',
                params: { idMount: '65ac1082ab0b9e96cd47b0cc' }
              })} style={{ width: '45%', display: 'flex', alignItems: 'center', gap: 5 }}>
                <View style={{ display: 'flex', width: '100%', overflow: 'hidden', justifyContent: 'center', borderRadius: 8, height: '45%', alignItems: 'center' }}>
                  <Image source={require('../../assets/fix/gunung/detail.png')}  />
                  <Text style={{ textAlign: 'center', position: 'absolute', color: '#fff', fontFamily: 'bold' }}>Informasi Detail Gunung</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate({ name: 'Rute' })} style={{ width: '45%', display: 'flex', alignItems: 'center', gap: 5  }}>
                <View style={{ display: 'flex', width: '100%', overflow: 'hidden', justifyContent: 'center', borderRadius: 8, height: '45%', alignItems: 'center' }}>
                  <Image source={require('../../assets/fix/gunung/rute.png')}/>
                  <Text style={{ textAlign: 'center', position: 'absolute', color: '#fff', fontFamily: 'bold' }}>Rute Pendakian Gunung</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate({ name: 'SyaratPendakian' })} style={{ width: '45%', display: 'flex', alignItems: 'center', gap: 5  }}>
                <View style={{ display: 'flex', width: '100%', overflow: 'hidden',justifyContent: 'center', borderRadius: 8, height: '45%', alignItems: 'center' }}>
                  <Image source={require('../../assets/fix/gunung/syarat.png')}/>
                  <Text style={{ textAlign: 'center', position: 'absolute', color: '#fff', fontFamily: 'bold' }}>Syarat Pendakian</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate({
                name: 'InfoReservasi',
                params: { idMount: '65ac1082ab0b9e96cd47b0cc' }
              })} style={{ width: '45%', display: 'flex', alignItems: 'center', gap: 5  }}>
                <View style={{ display: 'flex', width: '100%', overflow: 'hidden', justifyContent: 'center', borderRadius: 8, height: '45%', alignItems: 'center' }}>
                  <Image source={require('../../assets/fix/gunung/reservasi.png')}/>
                  <Text style={{ textAlign: 'center', position: 'absolute', color: '#fff', fontFamily: 'bold' }}>Reservasi</Text>
                </View>
              </Pressable>
            </View>
          </View>

        </View>
      </SafeAreaView>
    </View>

  );
};

export default Home;
