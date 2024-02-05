import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import BottomTabNavigation from "./navigation/BottomTabNavigation";
import EditProfile from "./screens/edit-profile/EditProfile";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import ModalScreen from "./components/home/ModalScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import InfoReservasi from "./screens/menu/info-reservasi/InfoReservasi";
import { InfoGunung, InfoRute, Notification } from "./screens";
import AddAnggota from "./screens/add-anggota/AddAnggota";
import HistoryOrder from "./screens/riwayat/HistoryOrder";
import Checkout from "./screens/checkout/Checkout";
import HistoryDetail from "./screens/riwayat/HistoryDetail";
import SyaratPendakian from "./screens/menu/syarat_pendakian/SyaratPendakian";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/FiraSans-Regular.ttf"),
    medium: require("./assets/fonts/FiraSans-Medium.ttf"),
    semibold: require("./assets/fonts/FiraSans-SemiBold.ttf"),
    bold: require("./assets/fonts/FiraSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Edit"
            component={EditProfile}
            options={{
              headerBackTitle: "back",
              headerTitle: "Edit Profil",
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackVisible: false,
              headerShown: false,
              presentation: 'modal'
            }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerBackVisible: false,
              headerShown: false,
              presentation: 'modal'
            }}
          />

          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{
              headerBackVisible: false,
              headerTitle: "Comments",
              presentation: "modal",
            }}
          />

          <Stack.Screen
            name="InfoReservasi"
            component={InfoReservasi}
            options={{
              headerBackVisible: true,
              headerTitle: "Info Reservasi",
            }}
          />
          
          <Stack.Screen
            name="InfoDetailGunung"
            component={InfoGunung}
            options={{
              headerBackVisible: true,
              headerTitle: "Info Detail Gunung",
              headerShown: true
            }}
          />

          <Stack.Screen
            name="AddAnggota"
            component={AddAnggota}
            options={{
              headerBackVisible: true,
              headerTitle: "Tambahkan Anggota",
              headerShown: true
            }}
          />

          <Stack.Screen
            name="History"
            component={HistoryOrder}
            options={{
              headerBackVisible: true,
              headerTitle: "Riwayat Reservasi",
              headerShown: true
            }}
          />

          <Stack.Screen
            name="checkout"
            component={Checkout}
            options={{
              headerBackVisible: true,
              headerTitle: "Checkout",
              headerShown: true
            }}
          />
          
          <Stack.Screen
            name="HistoryDetail"
            component={HistoryDetail}
            options={{
              headerBackVisible: true,
              headerTitle: "Detail Riwayat",
              headerShown: true
            }}
          />
          
          <Stack.Screen
            name="SyaratPendakian"
            component={SyaratPendakian}
            options={{
              headerBackVisible: true,
              headerTitle: "Informasi Syarat Pendakian",
              headerShown: true
            }}
          />
          
          <Stack.Screen
            name="Rute"
            component={InfoRute}
            options={{
              headerBackVisible: true,
              headerTitle: "Informasi Rute Pendakian",
              headerShown: true
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "regular",
    fontSize: 20,
  },
});
