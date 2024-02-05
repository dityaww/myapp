import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notification } from '../screens';

const NotifikasiStack = createNativeStackNavigator();

const NotifikasiNavigation = () => {
  return (
    <NotifikasiStack.Navigator>
      <NotifikasiStack.Screen 
        name="Notifikasi" 
        component={Notification} 
        options={{
            headerBackTitle: "back",
            headerShown: true
            
        }}/>
    </NotifikasiStack.Navigator>
  );
}

export default NotifikasiNavigation;