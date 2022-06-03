import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f6f7f9',
  },
  card: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  UserName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  UserInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  Posttext: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 12,
  },
  PostImg: {
    width: '100%',
    height: 250,
    // marginTop: 15,
    resizeMode: 'cover',
  },
  InteractionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  Interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  InteractionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
    marginRight: 5,
  },
});
