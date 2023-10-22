import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function Home({ navigation , route }){
    console.log(route.params.username);
    const [username , setUserName] = useState(route.params.username)
    return <View>
        <Text style={styles.User}>Welcome <Text style={styles.UserName}>{ username }</Text></Text>
    </View>
}

const styles = StyleSheet.create({
    User : {
        textAlign : 'center',
        fontSize : 20 ,
        padding : 10
    },
    UserName : {
        fontWeight : 'bold',
        color : 'violet'
    }
})