import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import sakpala from '../../assets/fix/sakpala.jpg'

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={sakpala} style={{ width: '100%', height: 250, borderRadius: 10 }}/>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
          <Text>Nomor yang bisa dihubungi</Text>
          <Text style={{ fontWeight: 'bold' }}>+6281328872541</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
          <Text>Email</Text>
          <Text style={{ fontWeight: 'bold' }}>mawarcamparea@gmail.com</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
          <Text>Website</Text>
          <Text style={{ fontWeight: 'bold' }}>https://www.sakpalamawar.com</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
          <Text>Instagram</Text>
          <Text style={{ fontWeight: 'bold' }}>@mawarcamparea</Text>
        </View>
      </View>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    wrapper: {
      margin: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
})