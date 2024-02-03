import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchUser, DetailUsers, DetailPost } from "../screens";

const SearchStack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchUser"
        component={SearchUser}
        options={{
          headerShown: true,
        }}
      />

      <SearchStack.Screen
        name="DetailUsers"
        component={DetailUsers}
        options={{
          headerShown: true,
          headerTitle: 'Detail',
          headerBackTitleVisible: false,
        }}
      />

      <SearchStack.Screen
        name="DetailPost"
        component={DetailPost}
        options={{
          headerShown: true,
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchNavigation;
