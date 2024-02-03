import { StyleSheet, Text, View, StatusBar, TouchableHighlight } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Menu = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 20, flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={{fontFamily: 'regular', fontSize: 16}}>Informasi Gunung</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('InfoGunung')}
            style={{ 
              backgroundColor: '#818cf8', 
              paddingHorizontal: 10, 
              paddingVertical: 8, 
              borderRadius: 6
            }}
            underlayColor={"blue"}
          >
            <View>
              <Ionicons
                name={"paper-plane"}
                size={18}
                color={"#fff"}
              />
            </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.wrapper}>
          <Text style={{fontFamily: 'regular', fontSize: 16}}>Informasi Lokasi</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('InfoLokasi')}
            style={{ 
              backgroundColor: '#818cf8', 
              paddingHorizontal: 10, 
              paddingVertical: 8, 
              borderRadius: 6
            }}
            underlayColor={"blue"}
          >
            <View>
              <Ionicons
                name={"paper-plane"}
                size={18}
                color={"#fff"}
              />
            </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.wrapper}>
          <Text style={{fontFamily: 'regular', fontSize: 16}}>Informasi Paket</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('InfoPaket')}
            style={{ 
              backgroundColor: '#818cf8', 
              paddingHorizontal: 10, 
              paddingVertical: 8, 
              borderRadius: 6
            }}
          >
            <View>
              <Ionicons
                name={"paper-plane"}
                size={18}
                color={"#fff"}
              />
            </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.wrapper}>
          <Text style={{fontFamily: 'regular', fontSize: 16}}>Informasi Penyewaan Pendakian</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('InfoRute')}
            style={{ 
              backgroundColor: '#818cf8', 
              paddingHorizontal: 10, 
              paddingVertical: 8, 
              borderRadius: 6
            }}
          >
            <View>
              <Ionicons
                name={"paper-plane"}
                size={18}
                color={"#fff"}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.wrapper}>
          <Text style={{fontFamily: 'regular', fontSize: 16}}>Informasi Rute Pendakian</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate('InfoRute')}
            style={{ 
              backgroundColor: '#818cf8', 
              paddingHorizontal: 10, 
              paddingVertical: 8, 
              borderRadius: 6
            }}
          >
            <View>
              <Ionicons
                name={"paper-plane"}
                size={18}
                color={"#fff"}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 16
  }
});
