import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import AppFonts from '../../../config/fonts';
import pixel from '../../../lib/pixel';
import AppValues from '../../../config/values';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: AppValues.padding,
  },
  sectionList: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  sectionListTitle: {
    ...AppFonts.bold,
    color: AppColors.primary,
  },
  separatorSection: {
    height: pixel(10),
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSearch: {
    marginRight: pixel(5),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pixel(10),
    paddingBottom: pixel(3),
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.lightGrey,
  },
  infoRowLeft: {
    width: pixel(110),
  },
  labelText: {
    ...AppFonts.medium,
    fontSize: pixel(15),
    color: AppColors.black,
  },
  trichYeuLabel: {
    ...AppFonts.medium,
    fontSize: pixel(15),
    color: AppColors.black,
    marginTop: AppValues.padding / 3,
  },
  trichYeuText: {
    ...AppFonts.medium,
    fontSize: pixel(15),
    color: AppColors.black,
    marginTop: AppValues.padding / 2,
  },
  taiLieuText: {
    ...AppFonts.medium,
    fontSize: pixel(15),
    color: AppColors.black,
    marginTop: AppValues.padding / 2,
  },
  filesBloc: {
    borderWidth: 0.5,
    borderColor: AppColors.lightGrey,
    marginTop: AppValues.padding / 3,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: pixel(5),
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.lightGrey,
  },
  buttonFile: {
    alignItems: 'center',
    justifyContent: 'center',
    width: pixel(32),
    height: pixel(32),
  },
});

export default Styles;
