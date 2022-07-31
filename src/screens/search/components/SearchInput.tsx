import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDevouncedValue } from '../../../hooks/useDevouncedValue';

interface Props {
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({style} : Props) => {

    const [ textValue, setTextValue ] = useState('');

    const deboncedValue = useDevouncedValue(textValue);

    useEffect(() => {
    }, [deboncedValue])
    

    return (
        <View style={{...styles.container, ...style as any}}>

            <View style={styles.textBackground}>

                <TextInput 
                    placeholder='Buscar pokémon'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios') ? 0 : 2
                    }}
                    value={textValue}
                    onChangeText={setTextValue}
                />

                <Icon 
                    name="search-outline"
                    color="grey"
                    size={30}
                />

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
});
