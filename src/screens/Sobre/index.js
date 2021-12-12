import React from "react";





import { View, StyleSheet } from "react-native";
import { Text, VStack, Center, NativeBaseProvider } from "native-base"

export const Sobre = ({ navigation }) => {
    return (
        <NativeBaseProvider>

            <View style={styles.contener}>
                <VStack width="100%" space={5} alignItems="center" >
                <Text fontSize="3xl" color="#fb923c" bold>O que Nosso App Faz?</Text>

                <Text fontSize="lg"color="#fdba74">O Organizador de Tarefas veio para <Text bold italic underline>facilitar sua vida</Text> . Nele você pode adicionar as tarefas do seu dia-a-dia
                    e as excluir conforme for concluindo cada umas das atividades pendentes.</Text>
                </VStack>
            </View>
   
        </NativeBaseProvider>

    )
}

const styles = StyleSheet.create({
    contener: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    txt: {
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 25,
        margin: 10,
        textAlign: 'center',
        color: '#FFF'
    }

})