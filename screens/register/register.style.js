import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginHorizontal: 40,
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: '#d4d4d4'
    },
    title: {
        fontFamily: 'semibold',
        fontSize: 24
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
    },
    btnSignIn: {
        backgroundColor: "#6366F1",
        paddingVertical: 16,
        borderRadius: 120 / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    submit: {
        marginTop: 30,
    },
    link: {
        display: 'flex',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    logo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    focusedTextInput: {
        borderColor: '#818cf8',
        borderWidth: 2
    }
})

export default styles