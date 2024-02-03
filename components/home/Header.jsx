import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./header.style";
import { SIZES } from "../../constants/theme";

const Header = ({ name, profilePicture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerContent}>
          <Text style={[styles.setTextcolor, { fontFamily: "regular" }]}>
            Welcome Back
          </Text>
          <Text
            style={[
              styles.setTextcolor,
              { fontFamily: "bold", fontSize: SIZES.xLarge, textTransform: 'capitalize' },
            ]}
          >
            {name}
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={styles.img}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
