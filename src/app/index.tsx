import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, SafeAreaView, View, Alert, ActivityIndicator } from "react-native"
import { Modalize } from "react-native-modalize";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from "expo-router"
import * as SMS from 'expo-sms';
import { themes } from "../themes/global"
import { IContact } from "../@types/contact";
import { IconAntDesign } from '../components/IconAntDesign';
import { IconFeather } from '../components/IconFeather';


// expo router sempre exporta DEFAULT
export default function App(){
    const [contactsList, setContactsList] = useState<IContact[]>([]);
    const [sorteioList, setSorteioList] = useState<IContact[]>([]);
    const [loading, setLoading] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    async function realizarSorteio() {
        try{
            const jsonValue = await AsyncStorage.getItem('contact_list')//busca lista de contatos e armazena em jsonValue

            if (jsonValue != null){                
                const parsed = JSON.parse(jsonValue)//converte string para JSON                
                let participantes: IContact[] = parsed;//array de objetos IContact

                if (participantes.length > 2) { //se há mais de 3 contatos realiza o sorteio                    
                    let sorteados : number[] = [];//array dos ids dos participantes sorteados
                    let notSort: boolean;
                    
                    for (let index = 0; index < participantes.length; index++) {//parcorre a lista de participantes
                        notSort = true
                        
                        while (notSort) {
                            const random = parseInt((Math.random() * participantes.length).toString());
                            
                            if (random != index && !sorteados.includes(random)) {
                                participantes[index].idFriend = participantes[random].id;
                                sorteados.push(random);
                                notSort = false;
                            } else if (random === index && index === participantes.length - 1) {
                                console.log ("o ultimo pegou o ultimo")
                                participantes[index].idFriend = participantes[0].idFriend
                                participantes[0].idFriend = participantes[random].id
                                sorteados.push(random);
                                notSort = false;
                            }
                        }
                    }
                    console.log('Soteio = ', participantes)
                } else {
                    Alert.alert('Atenção', 'Numero inssuficiente de participantes')
                }
                
            } else {
                Alert.alert('Atenção', 'Nenhum contato encontrado')
            }

            setLoading(false)

        } catch (e) {
            console.log("erro realizar sorteio: ", e)
            setLoading(false)
        }
    }

    const renderItem = ({ item }: { item: IContact }) => (
        <View style={[themes.paddingTop, themes.paddingLeft]}>
            <Text style={themes.title}><IconFeather name="square" size={24} /> {item.name} - {item.number}</Text>
        </View>
    );
        
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
                //'...item' cópia todos os atributos do item e altera apenas o checked
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
                    <Text><IconAntDesign name="contacts" size={24} /> Contatos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        setLoading(true);
                        setTimeout(realizarSorteio, 2000)}}
                    style={[themes.button, themes.marginBottom]}>
                    <Text><IconFeather name="globe" size={24}/> Realiza Sorteio</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => onOpen()}
                    style={[themes.button, themes.marginBottom]}>
                    <Text>Exemplo Modal</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" />}
                    
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