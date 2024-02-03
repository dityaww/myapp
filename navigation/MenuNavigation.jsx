import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoGunung, InfoPaket, InfoRute, InfoLokasi, Menu, InfoBooking } from '../screens';

const MenuStack = createNativeStackNavigator();

const MenuNavigation = () => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen 
        name="MenuScreen" 
        component={Menu} 
        options={{
            headerBackTitle: "back",
            headerShown: true
        }}/>
      
      <MenuStack.Screen 
        name="InfoGunung" 
        component={InfoGunung} 
        options={{
            headerBackTitle: "back",
            headerShown: false
        }}/>
      
      <MenuStack.Screen 
        name="InfoBooking" 
        component={InfoBooking} 
        options={{
            headerBackTitle: "back",
            headerShown: true,
            headerTitle: "Info Booking"
        }}/>

      <MenuStack.Screen 
        name="InfoPaket" 
        component={InfoPaket} 
        options={{
            headerBackTitle: "back",
            headerShown: true
        }}
        />

      <MenuStack.Screen 
        name="InfoRute" 
        component={InfoRute} 
        options={{
            headerBackTitle: "back",
            headerShown: true
        }}
        />

      <MenuStack.Screen 
        name="InfoLokasi" 
        component={InfoLokasi} 
        options={{
            headerBackTitle: "back",
            headerShown: true
        }}
        />
    </MenuStack.Navigator>
  );
}

export default MenuNavigation;