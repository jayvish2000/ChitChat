import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
    color: '#000',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 6,
  },
  userBtn: {
    borderColor: '#ECECEC',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500'
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000'
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});
