import { Text, View, TextInput, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import styles from "./searchUser.style";
import { searchUserData } from "../../hook/api";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SearchUser = () => {
  const [userData, setUserData] = useState([]);
  const [imgProfile, setImgProfile] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );

  const navigation = useNavigation();

  const searchByName = async (q) => {
    try {
      const response = await searchUserData(q);
      setUserData(response.data);
      // setImgProfile(response.data.avatar)
      console.log(response.data);
    } catch (error) {
      console.log("Error in search: ", error);
      setUserData("");
    }
  };

  useEffect(() => {
    if (userData === "") {
      console.log("no data");
      setUserData("");
    }
    console.log(userData);
  }, [userData]);

  return (
    <View style={styles.container}>
      {/* <Text>SearchUser</Text> */}
      <View style={styles.wrapperSearch}>
        <TextInput
          placeholder="search..."
          style={styles.inputSearch}
          onChangeText={(data) => {
            if (data !== "") {
              searchByName(data);
              console.log("input:", data);
            } else {
              searchByName("");
            }
          }}
        />
      </View>

      <ScrollView>
        <View style={styles.wrapperData}>
          {userData.length < 1 ? (
            <Text>No data..</Text>
          ) : (
            userData.map((items, idx) => {
              return (
                <View key={idx} style={styles.searchData}>
                  <View style={styles.descUser}>
                    <Image
                      source={{ uri: items.avatar === 'no avatar' ? imgProfile : items.avatar || imgProfile }}
                      style={{ width: 40, height: 40, borderRadius: 100 / 2 }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text style={{ fontFamily: "regular" }}>{items.id}</Text>
                      <Text style={{ fontFamily: "semibold", fontSize: 18 }}>
                        {items.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttons}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate({
                          name: "DetailUsers",
                          params: { userId: items.id },
                        });
                      }}
                    >
                      <Text style={{ color: '#0ea5e9', fontFamily: 'semibold' }}>View profile</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

    </View>
  );
};

export default SearchUser;
