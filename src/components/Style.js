import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#F1B104',
    width: '100%', /* to change width of button, got to buttonContainer */
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    padding: 12,
    borderRadius: 50,
    width: '100%',
    borderColor: '#F1B104',
    borderWidth: 2,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonOutlineText: {
    color: '#F1B104',
    fontWeight: '700',
    fontSize: 16,
  },
  titleContainer: {
    flexDirection: 'column',
    paddingBottom: 25
  },
  bigTitle: {
    fontSize: 36,
  },
  subTitle: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 50
  },
});