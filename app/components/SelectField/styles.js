import {StyleSheet} from 'react-native';
import AppFonts from '../../config/fonts';
import pixel from '../../lib/pixel';
import AppColors from '../../config/colors';
import hexToRgba from 'hex-to-rgba';
import AppValues from '../../config/values';
import {hdp} from '../../lib/responsive';

const Styles = StyleSheet.create({
  container: {},
  labelWrapper: {
    flexDirection: 'row',
  },
  label: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.primary,
    marginBottom: pixel(10),
  },
  error: {
    ...AppFonts.regular,
    color: '#B21E1E',
    fontSize: pixel(12),
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: AppColors.lightGrey,
    borderRadius: pixel(5),
    flexDirection: 'row',
    overflow: 'hidden',
  },
  inputWrapperActive: {
    borderColor: AppColors.accent,
  },
  inputText: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.primary,
  },
  inputTextPH: {
    color: hexToRgba(AppColors.primary, 0.3),
  },
  inputNoText: {
    flex: 1,
    justifyContent: 'center',
    padding: AppValues.padding,
    paddingTop: 0,
    paddingBottom: 0,
  },
  pressZone: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  dropIconBlock: {
    position: 'absolute',
    top: pixel(5),
    right: pixel(5),
    width: pixel(32),
    height: pixel(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropIcon: {
    color: AppColors.primary,
    fontSize: pixel(16),
  },
  modalWrapper: {
    padding: 0,
    margin: 0,
  },
  modal: {
    backgroundColor: AppColors.white,
    paddingTop: AppValues.padding,
    paddingLeft: AppValues.padding,
    paddingRight: AppValues.padding,
    paddingBottom: AppValues.padding,
    borderTopLeftRadius: pixel(8),
    borderTopRightRadius: pixel(8),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: hdp(90),
  },
  modalSearch: {
    marginTop: hdp(10),
    position: undefined,
    flex: 1,
    maxHeight: undefined,
  },
  dateOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectList: {
    flex: 1,
  },
  selectListWrapper: {
    padding: AppValues.padding / 2,
  },
  selectDone: {
    marginLeft: AppValues.padding / 2,
    marginRight: AppValues.padding / 2,
    marginTop: AppValues.padding / 2,
  },
  selectItem: {
    backgroundColor: AppColors.white,
    borderRadius: pixel(5),
    overflow: 'hidden',
    marginBottom: pixel(5),
  },
  selectItemActive: {
    backgroundColor: hexToRgba(AppColors.primary, 0.1),
  },
  selectItemWrapper: {
    padding: AppValues.padding / 2,
  },
  selectItemText: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.primary,
  },
});

export default Styles;
