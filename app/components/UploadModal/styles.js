import {StyleSheet} from 'react-native';
import AppColors from '../../config/colors';
const Styles = StyleSheet.create({
  modal: {
    padding: 20,
  },
  container: {
    //flex: 1,
    width: '100%',
    //height: 150,
    //alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  titleCom: {
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Styles;
