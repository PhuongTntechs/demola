import {StyleSheet} from 'react-native';
import AppColors from '../../../../config/colors';
import pixel from '../../../../lib/pixel';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingLeft: pixel(5),
  },
});

export default Styles;
