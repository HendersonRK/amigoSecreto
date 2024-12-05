import { StyleSheet } from "react-native";

export const colors ={
    grey50: '#FAFAFA',
    grey200: '#EEEEEE',
    grey900: '#212121',
    bluegrey50: '#ECEFF1',
    bluegrey100: '#CFD8DC',
    bluegrey200: '#B0BEC5',
    blue50: '#E3F2FD',
    blueA100: '#82B1FF',
    indigo600: '#3949AB',
    white: '#FFFFFF',
}

export const themes = StyleSheet.create ({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue50,
        paddingVertical: 12,
        paddingHorizontal: 8,
    }, 
    button:{
        backgroundColor: colors.blueA100,
        fontSize: 18,
        borderRadius: 8,
        padding: 12,
        width: "60%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton:{
        fontSize: 24,
        color: colors.white,
    },
    title:{
        fontSize: 24,
        color: colors.indigo600,
    },
    input: {
        backgroundColor: colors.grey50,
        fontSize: 16,
        padding: 12,
        borderWidth: 0.5,
        borderColor: colors.bluegrey200,
        borderRadius: 8,
        flex: 0.4,
    },
    marginLeft: {
        marginLeft: 8,
    },
    marginRight: {
        marginRight: 8,
    },
    marginBottom:{
        marginBottom: 16,
    },
    marginTop: {
        marginTop: 16
    },
    paddingTop:{
        paddingTop: 12
    },
    paddingLeft: {
        paddingLeft: 8
    }
})
