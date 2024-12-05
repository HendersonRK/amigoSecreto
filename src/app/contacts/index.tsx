import { Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { themes, colors } from "../../themes/global";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IContact } from "../../@types/contact";
import { styles } from "./styles";
import Feather from '@expo/vector-icons/Feather';


export default function Contacts() {

    const [contact, setContact] = useState<IContact>({} as IContact);
    const [contactsList, setContactsList] = useState<IContact[]>([]);

    const save = () => {
        const newList = [...contactsList,
            {
                id: contactsList.length + 1,
                name: contact.name,
                number: contact.number,
            }
        ];

        setContactsList(newList);
        storeData(newList);
        //limpa o contato após salvar
        setContact({
            name: '',
            number: ''
        } as IContact);
    }

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

    const removeContact = (id: number) => {
        try {
            Alert.alert('Remover Contato', 'Tem certeza disso?', [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        console.log('Operação cancelada');
                    }
                },
                {
                    text: 'Sim',
                    onPress: () => {

                        const newList = contactsList.filter(item => item.id != id);

                        setContactsList(newList);
                        storeData(newList);
                    }
                }
            ])
        } catch (err) {
            console.log("🚀 ~ removeItem ~ err:", err)
        }
    }

   /* const updateItem = (id: number) => {
        try {

            const newList = todoList.map(item =>
                (item.id === id) ? {
                    ...item,
                    checked: !item.checked
                } :
                    { ...item }
            )

            setTodoList(newList);
            storeData(newList);

        } catch (err) {
            console.log("🚀 ~ updateItem ~ err:", err)
        }
    }*/

    useEffect(() => {

        const fetchData = async () => {
            const fetch = await getData();
            setContactsList(fetch);
        }

        fetchData();

    }, []);
    /*
        O array de dependencias vazio faz com que esse
        useEffect seja executado apenas 1 vez, na primeira vez
        que a tela for renderizada
    */

    const Item = ({ id, name, number }: IContact) => (
        <View style={styles.item}>
            <Text style={styles.contact}>{name} - {number}</Text>
            <TouchableOpacity
                onPress={() => removeContact(id)}>  
                <Feather name="trash-2" size={24} color="red" />              
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={themes.container}>

            <View style={styles.form}>
                <TextInput
                    style={themes.input}
                    onChangeText={(value) => setContact({ ...contact, name: value})}
                    placeholder="Nome"
                    autoCapitalize="characters"
                    value={contact.name} />

                <TextInput
                    style={themes.input}
                    onChangeText={(value) => setContact({ ...contact, number: value})}
                    placeholder="Número"
                    value={contact.number} />

                <TouchableOpacity onPress={() => save()}>
                    <Feather name="save" size={24} color={colors.bluegrey200} />
                </TouchableOpacity>

            </View>

            <Text style={[themes.title, themes.marginTop]}>Lista de Contatos:</Text>

            <FlatList
                data={contactsList}
                renderItem={({ item }) =>
                    <Item id={item.id} name={item.name} number={item.number} />
                }
                ListEmptyComponent={<Text style={styles.placeHolder}>Nenhum contato cadastrado</Text>} 
                keyExtractor={item => item.id.toString()} />

        </SafeAreaView>
    )
}
