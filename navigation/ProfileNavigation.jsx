import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cart, Profile } from "../screens";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
        <ProfileStack.Screen 
            name="ProfileScreen" 
            component={Profile} 
            options={{
                headerShown: false
            }}
        />

        <ProfileStack.Screen 
            name="Cart" 
            component={Cart} 
            options={{
                headerBackTitle: "back",
                headerShown: true
            }}
        />
  </ProfileStack.Navigator>
  )
}

export default ProfileNavigation