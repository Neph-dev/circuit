import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#fff', //1f2432 2e364b
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 20,
    width: '100%',
  },
  dateAndTimeContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    right: 0,
    position: 'relative',
    marginRight: 5,
  },
  weatherContainer: {
    flexDirection: 'row',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherIcon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  weather: {
    fontSize: 18,
    color: '#000',
  }
})

export default styles;