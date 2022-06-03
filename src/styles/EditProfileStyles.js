import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  actioncontainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,

  },
  divider: {
    borderRightWidth: 1,
    height: '110%',
  },
  icon: {
    paddingLeft: 8,
    backgroundColor: '#fafafa',
  },
  textInput: {
    flex: 1,
    padding: 10,
    color: '#333333',
    width: '100%',
    height: 42,
    backgroundColor: '#fafafa'
  },
  imgbg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  chooseimg: {
    textAlign: 'center',
    padding: 6,
    fontSize: 18,
  },
});
