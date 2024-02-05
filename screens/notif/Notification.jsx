import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useState } from "react";
import { useRef } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FlashList } from "@shopify/flash-list";

const apiUrl = Constants.expoConfig.extra.API_URL;

const Notification = () => {
  const selector = useSelector((state) => state.auth)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

//   console.log("notif", notification);

    const [dataNotif, setDataNotif] = useState(null)

    useEffect(() => {
        // schedulePushNotification()
        if(selector.token){
            const apiEndpoint = `${apiUrl}/notif/alldata`;
    
            const response = axios.get(apiEndpoint, {
                headers: {
                    "Authorization": selector.token
                }
            });
    
            response.then((res) => {
                // console.log(res.data);
                setDataNotif(res.data.data)
            })
        } else{
            setDataNotif(null)
        }
        // console.log(response);
    }, [dataNotif, selector])
    
  
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            console.log(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function schedulePushNotification() {
        try {
            // Gantilah URL dengan endpoint API yang benar
            const apiEndpoint = `${apiUrl}/notif/alldata`;
            if(selector.token !== null){
                const response = await axios.get(apiEndpoint, {
                    headers: {
                        "Authorization": selector.token
                    }
                });
                
                const datas = response.data.data
                // setDataNotif(response.data.data)
                return datas
            }
            
            const sound = 'default'; // Ganti dengan suara kustom jika diperlukan

            const NotifikasiArr = datas.map(items => {
                return{
                    content: {
                        title: items.title, // Gunakan nilai default jika title kosong
                        body: items.description, // Gunakan nilai default jika body kosong
                        data:  { data: 'goes here' }, // Gunakan nilai default jika data kosong
                    },
                    trigger: { seconds: 2 },
                    sound: sound,
                    ios: {
                        sound: sound,
                    },
                    android: {
                        sound: sound,
                    },
                }
            })
    
            for (const notification of NotifikasiArr) {
                await Notifications.scheduleNotificationAsync(notification);
            }

        } catch (error) {
            console.error('Error scheduling push notification:', error.message);
        }
    }
  
    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            // Konfigurasi saluran notifikasi untuk Android
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        } else {
            // Konfigurasi untuk iOS (tidak perlu)
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            token = (await Notifications.getExpoPushTokenAsync({ projectId: '7fe84369-f018-4b79-b250-bfc213dff3fe' })).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    const renderItem = ({item}) => (
        <View style={{ paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold', color: '#404040', fontSize: 16, paddingBottom: 3 }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: '#525252' }}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ margin: 20, height: "100%", paddingBottom: 20 }}>
                {dataNotif !== null && 
                    <FlashList data={dataNotif} renderItem={renderItem} estimatedItemSize={100} showsVerticalScrollIndicator={false}/>
                }
            </View>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})