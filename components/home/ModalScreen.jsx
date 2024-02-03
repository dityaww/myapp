import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig.extra.API_URL;

const ModalScreen = ({ route }) => {
  const idContentPost = route.params?.userId;
  // console.log(idContentPost)

  const [dataComments, setDataComments] = useState([]);
  // const [idPostingan, setIdPostingan] = useState('')
  const [text, setText] = useState('')

  const selector = useSelector((state) => state.auth)

  const postComments = () => {
    const data = { text }

    if(!selector.token){
      alert('login dulu mas!')
    } else{
      axios.post(`${apiUrl}/post/comment/${idContentPost}`, data, {
        headers: {
          'authorization': `${selector.token}`
        },
      }).then((res) => {
        console.log('post komen', res.data);
      }).catch((error) => console.log("Error in Comment:", error.response.data))
    }

    setText("")
  }

  useEffect(() => {
    const detailContentData = async () => {
      const response = await axios.get(
        `${apiUrl}/post/detail/${idContentPost}`
      );
      return response.data.data;
    };

    detailContentData()
      .then((res) => {
        setDataComments(res.comments);
      })
      .catch((error) => console.log("Error in Comment:", error));
 
  }, [dataComments]);

  // dataComments.map((items) => console.log(items.text));
  // console.log(dataComments);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.container}>
      {/* {console.log(dataComments)} */}
        <ScrollView>
          <View style={styles.wrapper}>
              {dataComments.map((items, index) => {
                return (
                  <View key={index} style={styles.commentStyle}>
                    <Text style={{ fontSize: 13, fontFamily: 'bold'}}>{items.postedBy}</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'regular' }}>{items.text}</Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>

      <View style={styles.inputComments}>
        {/* <Text>{text}</Text> */}
        <View style={styles.inputStyle}>
          <TextInput
            label={"comment"}
            placeholder={"Fill your comment..."}
            keyboardAppearance={"dark"}
            style={{ fontFamily: 'regular', fontSize: 16, width: 200, }}
            value={text}
            onChangeText={comment => setText(comment)}  
            />

            <TouchableHighlight
            onPress={postComments}
            underlayColor="#818cf8"
            style={{backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 100/2}}
          >
            <View>
              <Text style={{ color: "#fff", fontFamily: "bold" }}>Post</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingView>

  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    // backgroundColor: "red",
  },
  wrapper: {
    marginVertical: 20,
    gap: 20,
  },
  commentStyle: {
    marginHorizontal: 20,
    gap: 4
    // backgroundColor: 'blue'
  },
  inputComments: {
    width: '100%',
    height: 140,
    backgroundColor: '#ffffff',
    bottom: 0,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d4d4d4'
  },
  inputStyle: {
    borderWidth: 1,
    marginHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#d4d4d4',
    borderRadius: 100/2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
