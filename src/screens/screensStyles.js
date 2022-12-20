import { StyleSheet } from "react-native"

const screensStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    screenTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
        marginTop: 45,
        marginBottom: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    cardsContainer: {
        flex: 1,
        width: "100%",
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
})

export default screensStyles