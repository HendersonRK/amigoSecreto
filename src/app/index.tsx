import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text, TouchableOpacity, SafeAreaView, View } from "react-native"
import { themes } from "../themes/global"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from "expo-router"
import { IContact } from "../@types/contact";
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";


// expo router sempre exporta DEFAULT
export default function App(){
    const [contactsList, setContactsList] = useState<IContact[]>([]);
    const [sorteioList, setSorteioList] = useState<IContact[]>([]);
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    async function realizarSorteio() {
        try{
            const jsonValue = await AsyncStorage.getItem('contact_list')

            if (jsonValue != null){
                const parsed = JSON.parse(jsonValue)
                let participantes: IContact[] = parsed;
                let sorteados : number[] = [];
                let notSort;

                for (let index = 0; index < participantes.length; index++) {
                    notSort = true
                    
                    while (notSort) {
                        const random = parseInt((Math.random() * participantes.length).toString());
                        
                        if (random !== index && !sorteados.includes(random)) {
                            participantes[index].idFriend = (random+1)
                            sorteados.push(random);
                            notSort = false;
                        }
                    }
                }
                console.log('Soteio = ', participantes)
            }

        }catch (e) {
            console.log("erro realizar sorteio: ", e)
        }
    }

    const renderItem = ({ item }: { item: IContact }) => (
        <View style={[themes.paddingTop, themes.paddingLeft]}>
            <Text style={themes.title}><Feather name="square" size={24} color="black" /> {item.name} - {item.number}</Text>
        </View>
    );
    
    const storeData = async (value: IContact[]) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('contact_list', jsonValue);
        } catch (e) {
            // saving error
            console.log("🚀 ~ storeData ~ e:", e);
        }
    };
    
    const getData = async (): Promise<IContact[]> => {
        try {

            const jsonValue = await AsyncStorage.getItem('contact_list');

            if (jsonValue != null) {
                const parsed = JSON.parse(jsonValue);
                return parsed;
            } else {
                return [];
            }

        } catch (e) {
            console.error("Erro ao ler os dados:", e);
            return [];
        }
    };

    const updateItem = (id: number) => {
        try {
            //verifica se o ID passado como parametro é igual ao ID do item
            const newList = contactsList.map(item =>
                (item.id === id) ? {...item, checked: !item.checked} : { ...item } 
            )

            setSorteioList(newList);
            //storeData(newList);

        } catch (err) {
            console.log("🚀 ~ updateItem ~ err:", err)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            const fetch = await getData();
            setContactsList(fetch);
        }

        fetchData();

    }, []);

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={themes.container}>

                <Text style={themes.title}>App sorteiro amigo secreto</Text>

                <TouchableOpacity 
                    onPress={() => router.navigate('contacts')}
                    style={[themes.button, themes.marginBottom]}>
                    <Text><AntDesign name="contacts" size={24} color="black" /> Contatos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => realizarSorteio()}
                    style={[themes.button, themes.marginBottom]}>
                    <Text><Feather name="globe" size={24} color="black" /> Realiza Sorteio</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => onOpen()}
                    style={[themes.button, themes.marginBottom]}>
                    <Text>Exemplo Modal</Text>
                </TouchableOpacity>
                
                <Modalize                     
                    ref={modalizeRef} 
                    avoidKeyboardLikeIOS 
                    modalHeight={300}
                    flatListProps={{
                        data: contactsList,
                        renderItem,                     
                        keyExtractor: item => item.id.toString(),
                    }}>
                </Modalize>

            </SafeAreaView>
        </GestureHandlerRootView>
       )
}