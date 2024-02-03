import { Text, View, ScrollView } from "react-native";
import React from "react";
import styles from "./detailPost.style";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../../components/home/Card";
import axios from "axios";

const DetailPost = () => {

  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const selector = useSelector((state) => state.searchdata)
  const [imgProfile, setImgProfile] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
  // useEffect
  
  useEffect(() => {
    setData(selector.data.posts)
    setName(selector.data.name)
    setAvatar(selector.data.avatar)
    // console.log(selector.data);
  }, [data, selector])
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {data.map((items, idx) => {
            return(
              <View key={idx}>
                <Card
                  idContent={items._id}
                  profilPicture={avatar}
                  username={name}
                  captions={items.caption}
                  category={items.category}
                  image={items.photo}
                  createdAt={items.createdAt}
                  like={items.likes?.length}
                  />
              </View>
            )
          })}
        </View>

        {/* {data.length !== 0 && data.map((items, index) => {
          return(
          )
        })} */}
      </ScrollView>

    </View>
  );
};

export default DetailPost;
