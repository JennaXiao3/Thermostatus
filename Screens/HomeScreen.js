import { CurrentRenderContext } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

//geolocation
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

// firebase
import { firebase } from '../src/constants/FirebaseConfig';
const database = firebase.database();

//location checking
import { userAtHome } from '../helpers/location';


const intervalOfChange = 4000; // 600000

export const HomeScreen = ({navigation}, props) => {

    const [positionNow, setPositionNow] = useState(null);
    const [ watchPosition, setWatchPosition ] = useState({latitude: 0, longitude: 0});
    const [change, setChange] = useState(0);
    // const [ currentTime, setCurrentTime ] = useState('now');
    const [atHome, setAtHome] = useState(true);
    const [email, setEmail] = useState("idkman@gmail.com");
    const [houseCoords, setHouseCoords] = useState({latitude: 0, longitude: 0});
    const [houseCode, setHouseCode] = useState('hi');
    // let flag = true;
 

    useEffect(
       () => {
        setEmail(firebase.auth().currentUser.email);
        console.log(email);
        Geolocation.getCurrentPosition(
            (position) => {
                setWatchPosition({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude,                   
                });

            }, (error) => {

            }, 
            { enableHighAccuracy: true}

        );

        checkingGeo();
        }, 
    []);

    useEffect(async () => {
        //get house coords
        console.log(email);
        // getCurrHouse(email);
        if (!(email == "idkman@gmail.com")) {
            const firstResponse = await axios.get(`http://localhost:5000/search/getCurrentHouse/${email}`);
            console.log(firstResponse.data);
            const houseCode = firstResponse.data;
            console.log(houseCode);
            setHouseCode(houseCode);
             
            const secondResponse = await axios.get(`http://localhost:5000/search/getHouseCoords/${houseCode}`);
            console.log(secondResponse.data);
            const coordsData = secondResponse.data;
    
            setHouseCoords({latitude: coordsData.latitude, longitude: coordsData.longitude});

        }

    }, [email]);


    useEffect(() => {
        console.log('hi, line 58');
        compareToHouse();
    }, [watchPosition]);

    const compareToHouse = () => {
        let isAtHome = userAtHome(watchPosition.longitude, watchPosition.latitude, houseCoords.longitude, houseCoords.latitude);
        setAtHome(isAtHome);
        
        let data = {
            code: houseCode,
            email: email,
            isAtHome: isAtHome,
        }
        // update so user is atHome
        axios.post(`http://localhost:5000/update/updateStatus`, data);
    }


    // note: clean up set interval when leaving page
    const checkingGeo = () => {
        setInterval(() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    //counter++;
                    //console.log(watchPosition);
                    //console.log(position.coords);
                    setWatchPosition(() => position.coords);
                    console.log("in checking Geo");

                }, (error) => {
                    console.log('rip: ' + error);
                }, { enableHighAccuracy: true }
            );  
            setChange((prev) => {
                return ++prev;
            });
        }, [intervalOfChange]);
    }

    // useMemo(() => checkingGeo(), [watchPosition]);


    const handlePressUser = async () => {
        const userInfo = await axios.get(`http://localhost:5000/search/getStatus/${email}`);
        const houseId = await axios.get(`http://localhost:5000/search/getCurrentHouse/${email}`);
        const houseCoords = await axios.get(`http://localhost:5000/search/getHouseCoords/${houseId.data}`);

        console.log('user info (username, temp)');
        console.log(userInfo.data);
        console.log('house id of user');
        console.log(houseId.data);
        console.log('house coordinates');
        console.log(houseCoords.data);
        console.log('user coords');
        console.log(watchPosition);
    }

    if (atHome && watchPosition) {
        return(
            <HomeScreenAtHome change={change} onpress={handlePressUser}></HomeScreenAtHome>
        );
    } else if (watchPosition) {
        return(
            <HomeScreenAwayHome onpress = {handlePressUser}></HomeScreenAwayHome>
        );
    } else {
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

}



const HomeScreenAtHome = (props) => {
    return(
        <View style={[styles.screenContainer, {backgroundColor: 'blue'}]}>
            <Text>At home screen</Text>
            <Image source={{uri: "https://thumbs.dreamstime.com/b/puppies-celebrating-birthday-singing-14013137.jpg"}}
            style={{width: 200, height: 200}}></Image>
            <TouchableOpacity onPress={() => navigation.navigate('managehomes')}>
                <Text>Go to Manage Homes</Text>
                <Text>{props.change}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onpress}>
                <Text>printing user infooo</Text>
            </TouchableOpacity>
            
            <StatusBar style="auto" />
      </View>
    );

}

const HomeScreenAwayHome = (props) => {
    return(
        <View style={styles.screenContainer}>
            <Text>Not at home screen</Text>
            <Image source={{uri: "https://thumbs.dreamstime.com/b/puppies-celebrating-birthday-singing-14013137.jpg"}}
            style={{width: 200, height: 200}}></Image>
            <TouchableOpacity onPress={() => navigation.navigate('managehomes')}>
                <Text>Go to Manage Homes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onpress}>
                <Text>printing user infooo</Text>
            </TouchableOpacity>
            
            <StatusBar style="auto" />
      </View>
    );
    
}




const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    }
});

        /*
        Geolocation.watchPosition(
            (position) => {
                setWatchPosition({
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude
                });
                console.log("line 36");
                console.log(watchPosition);
            }, (error) => {
                console.log('rip')
            }
            , { enableHighAccuracy: true, interval: 5000, fastestInterval: 5000}
        );*/