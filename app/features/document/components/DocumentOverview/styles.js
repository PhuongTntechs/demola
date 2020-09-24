import {StyleSheet} from 'react-native';
import AppColors from '../../../../config/colors';
import AppValues from '../../../../config/values';
import pixel from '../../../../lib/pixel';
import {wdp} from '../../../../lib/responsive';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: AppValues.padding,
    marginLeft: pixel(5),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: AppValues.padding / 3,
    padding: AppValues.padding / 3,
    borderWidth: 0.5,
    borderColor: AppColors.deepGrey,
    marginLeft: pixel(5),
  },
  unread: {
    width: pixel(10),
    height: pixel(10),
    borderRadius: pixel(5),
    backgroundColor: AppColors.secondary2,
  },
  read: {
    width: pixel(10),
    height: pixel(10),
  },
  labelBloc: {
    width: wdp(25),
    paddingHorizontal: pixel(5),
  },
  trichYeuBloc: {
    flex: 1,
    paddingRight: pixel(5),
  },
  buttonDownload: {
    padding: pixel(5),
  },
});

export default Styles;
