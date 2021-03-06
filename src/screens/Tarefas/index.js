import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";


import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import TaskList from '../../components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);



export const Tarefas = ({ navigation }) => {
    const [task, setTask] = useState([]);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(true);

    const getTasks = async () => {
        try {
            const response = await fetch('https://apiagenda.herokuapp.com/evento');
            const json = await response.json();
            setTask(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

       
    }

    function handleAdd() {
        if (input === '') return;

        fetch('https://apiagenda.herokuapp.com/evento', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descricao: input
            })
        });

        setOpen(false);
        setInput('');
       

    }

    const handleDelete = useCallback((data) => {
        fetch('https://apiagenda.herokuapp.com/evento/' + data.id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
           

    })

    useEffect(() => {
        getTasks();
    }, [task]);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#171d31" barStule="light-content" />
           



            <View style={styles.container}>
                <Text style={styles.title}>Minhas Tarefas</Text>
                {isLoading ? <ActivityIndicator size="large" color="#FFA500"/> : (
                    <FlatList
                        data={task}
                        marginHorizontal={10}
                        showsHorizontalScrollIndicator={false}

                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}



                    />
                )}
            </View>

            <Modal animationType="slide" transparent={false} visible={open}>

                <SafeAreaView style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setOpen(false)}>
                            <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Nova Tarefa</Text>
                    </View>

                    <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
                        <TextInput
                            multiline={true}
                            placeholderTextColor="#747474"
                            autoCorrect={false}
                            placeholder="Acrecentar tarefas..."
                            style={styles.input}
                            value={input}
                            onChangeText={(texto) => setInput(texto)}
                        />
                        <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
                            <Text style={styles.handleAddText}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </SafeAreaView>




            </Modal>


            <AnimatedBtn
                style={styles.fab}
                useNativeDriver
                animation="bounceInUp"
                duration={1500}
                onPress={() => setOpen(true)}
            >
                <Ionicons name="ios-add" size={35} color="#FFF" />
            </AnimatedBtn>




        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    title: {
        marginTop: 10,
        paddingBottom: 10,
        fontSize: 25,
        textAlign: 'center',
        color: "#fb923c"
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#0094FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        right: 25,
        bottom: 25,
        elevation: 2,
        zIndex: 9,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 3 }

    },
    modal: {
        flex: 1,
        backgroundColor: '#171d31'
    },
    modalHeader: {
        marginLeft: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalTitle: {
        marginLeft: 15,
        fontSize: 25,
        color: '#FFF'
    },
    modalBody: {
        marginTop: 15
    },
    input: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        backgroundColor: '#FFF',
        padding: 9,
        height: 85,
        textAlignVertical: 'top',
        color: '#000',
        borderRadius: 5
    },
    handleAdd: {
        backgroundColor: '#FFF',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5
    },
    handleAddText: {
        fontSize: 20,

    }


});
