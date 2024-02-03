import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const InfoBooking = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('')

  console.log(selectedLanguage);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <ScrollView>
        <View style={styles.wrapper}>
            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Objek Wisata</Text>
                <Text style={{ fontFamily: 'bold', fontSize: 20 }}>Gunung Ungaran via Mawar</Text>
            </View>

            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Tanggal Booking</Text>
                <TextInput 
                    label={"date-booking"} 
                    placeholder={"Pilih tanggal pendakian"} 
                    style={styles.styleInput}/>
            </View>

            <View>
                <Text style={styles.label}>Jumlah Hari Pendakian</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }
                        >
                        <Picker.Item label="1 hari" value="1 hari" />
                        <Picker.Item label="2 hari" value="2 hari" />
                        <Picker.Item label="3 hari" value="3 hari" />
                        <Picker.Item label="4 hari" value="4 hari" />
                    </Picker>
                    {/* <TextInput 
                    label={"days-hiking"} 
                    placeholder={"Pilih lama pendakian"} 
                    style={{ borderWidth: 1, borderColor: '#666666', paddingVertical: 10 }}
                    keyboardType='number-pad'
                    /> */}
            </View>

            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Nama Ketua Rombongan</Text>
                <TextInput 
                    label={"leader-name"} 
                    placeholder={"Masukkan nama ketua rombongan"} 
                    style={styles.styleInput}
                    keyboardType='ascii-capable'
                    />
            </View>
            
            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    label={"email"} 
                    placeholder={"Masukkan email"} 
                    style={styles.styleInput}
                    inputMode='email'
                    keyboardType='email-address'
                    />
            </View>
            
            <View style={{ gap: 10 }}>
                <Text style={styles.label}>No HP Darurat</Text>
                <TextInput 
                    label={"phone-number"} 
                    placeholder={"Masukkan nomor hp"} 
                    style={styles.styleInput}
                    keyboardType='phone-pad'
                    />
            </View>
            
            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Alamat</Text>
                <View style={styles.styleInput}>
                    <TextInput 
                        label={"address"} 
                        placeholder={"Masukkan alamat"} 
                        multiline={true}
                        textAlignVertical='left'
                        keyboardType='ascii-capable'
                        />
                </View>
            </View>
            
            <View style={{ gap: 10 }}>
                <Text style={styles.label}>Jumlah Rombongan</Text>
                <TextInput 
                    label={"rombongan"} 
                    placeholder={"Masukkan jumlah rombongan"} 
                    style={styles.styleInput}
                    keyboardType='number-pad'
                    />
            </View>

            <View style={{ width: '50%', marginTop: 20}}>
                <Pressable style={styles.btnBooking} onPress={() => alert("lets booking")}>
                    <Text style={{ color: '#fff', fontFamily: 'regular' }}>Booking Now</Text>
                </Pressable>
            </View>
        </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default InfoBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    wrapper: {
        marginHorizontal: 20,
        marginVertical: 30,
        // borderWidth: 1,
        gap: 20
    },
    label: {
        color: '#a3a3a3',
        fontSize: 14,
        fontFamily: 'regular'
    },
    btnBooking: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 100/2
    },
    styleInput: {
        borderWidth: 1, 
        borderColor: '#d4d4d4', 
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 10
    }
})