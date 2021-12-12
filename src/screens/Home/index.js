import React from "react";

import { Text,Button  } from 'react-native-elements';
import { NativeBaseProvider, Box, Heading, VStack } from 'native-base';





import { View, StyleSheet, TouchableOpacity,} from "react-native";

export const Home = ({ navigation }) => {
    return (

        <View style={styles.contener}>
            <NativeBaseProvider >
                <Box>
                    <VStack width="100%" space={5} alignItems="center" >

                        <Heading color="#fb923c" fontSize="3xl" padding = {5}>Organizador de Tarefas </Heading>
                        
                        <Box>


                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Tarefas')}>
                            <Text style={styles.appButtonText}>Agenda</Text>
                        </TouchableOpacity>


                        <Button style={styles.UIbtn} onPress={() => navigation.navigate('Sobre')}
                            title="Sobre o App. "
                            type="clear"
                        />

                        </Box>
                        
                    </VStack>

                </Box>
            </NativeBaseProvider>









        </View>
    )
}
const styles = StyleSheet.create({
    contener: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    btn: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 100,
        backgroundColor: '#41Aef4',
        padding: 30,
        borderRadius: 25,


    },
    UIbtn: {

        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
        backgroundColor: '#ADD8E6',
        padding: 30,
        borderRadius: 20,


    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
});