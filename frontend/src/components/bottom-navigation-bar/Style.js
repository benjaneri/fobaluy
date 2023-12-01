import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //bg="white" width="100%" height="100%" alignSelf="center" pt={0} mt={0}
  box: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '8%',
  },
  homeButton: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 100,
    width: '15%',
    height: '90%',
    marginBottom: '5%',
    justifyContent: 'center',
  },
  homeButtonPressed: {
    backgroundColor: 'green.700',
  },
  buttons: {
    marginBottom: 1,
    color: '#000000',
  },
});
