import { TouchableOpacity, Text, View, TextInput, Image, Pressable } from "react-native";
import React from "react";
import { useState } from "react";
import styles from "./upload.style";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";

import Constants from 'expo-constants';

const UploadContent = () => {
  // base-url API
  const apiUrl = Constants.expoConfig.extra.API_URL;

  // data post
  const [caption, setCaption] = useState("")
  const [category, setCategory] = useState("")

  const [imageData, setImageData] = useState([])
  const [imgDummy, setImgDummy] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );

  const selector = useSelector(state => state.auth)
  const [pickedImage, setPickedImage] = useState(null); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      setImageData(result.assets[0])
    }
  };

  console.log(imageData);
  
  const submitImage = () => {
    // Implement your logic here
    // For example, you might want to send the image URI to a server
    // or perform any other action with the selected image.

    // butuh token untuk bisa uploads
    if(selector.token !== null){
      const urlPostContent = `${apiUrl}/post/createpost`
      const formData = new FormData()
      const fileName = imageData.uri.split('/').pop()

      formData.append('photo', {
        uri: imageData.uri,
        type: imageData.type,
        name: fileName
      })

      formData.append('category', category)
      formData.append('caption', caption)

      axios.post(urlPostContent, formData, {
        headers: {
          'Authorization': `${selector.token}`,
          'Content-Type': 'multipart/form-data'
        },
      }).then((response) => {
        console.log(response.data.data)
        alert("berhasil upload!")
        console.log('Submitting image:', pickedImage);  
        setCaption("")
        setCategory("")
        setPickedImage(null)
      }).catch((error) => {
        console.log("API errors: ", error);
        console.log("Gagal Upload gambar!");
      })
    } else{
      alert("Anda belum punya akun!")
    }

  };
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperContent}>
          {/* Image */}
          <View>
            <Image 
              source={{ uri: pickedImage || imgDummy}}
              style={{ width: `100%`, height: 300 }}
            />
          </View>

          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={{ fontFamily: "regular", 
            fontSize: 16, 
            color: '#fff'
            }}>
              Pilih foto
            </Text>
          </TouchableOpacity>

          {/* Caption */}
          <View style={styles.componentStyle}>
            <Text style={{ fontFamily: 'bold' }}>Caption</Text>
            <View style={styles.styleInput}>
              <TextInput
                placeholder="masukkan caption"
                multiline={true}
                value={caption}
                onChangeText={(caption) => {
                  setCaption(caption);
                }}
                />
            </View>
          </View>

          {/* Category */}
          <View style={styles.componentStyle}>
            <Text style={{ fontFamily: 'bold' }}>Category</Text>
            <TextInput
              style={styles.styleInput}
              placeholder="masukkan kategori postingan"
              value={category}
              onChangeText={(category) => {
                setCategory(category);
              }}
            />
          </View>

          <Pressable 
            onPress={submitImage} 
            disabled={!pickedImage}
            style={{ 
              backgroundColor: '#6366F1', 
              alignItems: 'center', 
              paddingVertical: 12, 
              borderRadius: 8 
            }}>
            <Text style={{ 
              color: '#fff',
              fontFamily: 'bold',
              fontSize: 16  
              
            }}>Upload</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UploadContent;

