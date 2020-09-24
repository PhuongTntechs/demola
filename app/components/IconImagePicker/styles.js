import {StyleSheet} from 'react-native';
import {hdp, wdp} from '../../lib/responsive';
import AppColors from '../../config/colors';
import AppValues from '../../config/values';
import pixel from '../../lib/pixel';

const Styles = StyleSheet.create({
  modalWrapper: {
    padding: 0,
    margin: 0,
  },
  modal: {
    flex: 1,
    // marginTop: hdp(50),
    backgroundColor: AppColors.white,
    paddingTop: AppValues.padding,
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
    paddingBottom: AppValues.padding,
    borderTopLeftRadius: wdp(5),
    borderTopRightRadius: wdp(5),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: hdp(90),
  },
  selectItem: {
    backgroundColor: AppColors.white,
    borderRadius: pixel(5), //wdp(0.5),
    overflow: 'hidden',
    marginBottom: pixel(10), //wdp(1),
  },
  selectItemWrapper: {
    padding: AppValues.padding / 2,
  },
  selectItemText: {
    color: AppColors.primary,
  },
});

export default Styles;
