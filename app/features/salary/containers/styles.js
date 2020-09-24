import {StyleSheet} from 'react-native';
import AppColors from '../../../config/colors';
import AppValues from '../../../config/values';
import pixel from '../../../lib/pixel';
import AppFonts from '../../../config/fonts';
import {wdp} from '../../../lib/responsive';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingHorizontal: AppValues.padding,
    paddingVertical: AppValues.padding / 2,
  },
  flex: {
    flex: 1,
  },
  buttonYear: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: AppColors.lightGrey,
    padding: AppValues.padding / 2,
    borderRadius: pixel(5),
    marginBottom: AppValues.padding / 2,
  },
  headerList: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.secondary2,
    //paddingHorizontal: pixel(5),
  },
  headerCol1: {
    alignItems: 'center',
    width: pixel(50),
    borderRightWidth: 0.5,
    borderRightColor: AppColors.white,
    paddingVertical: AppValues.padding / 2,
  },
  headerCol2: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: AppValues.padding / 2,
    borderRightWidth: 0.5,
    borderRightColor: AppColors.white,
  },
  headerCol3: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: AppValues.padding / 2,
  },
  headerText: {
    ...AppFonts.bold,
    fontSize: pixel(14),
    color: AppColors.white,
  },
  selectField: {
    flex: 1,
    height: pixel(35),
    borderBottomWidth: 1,
    padding: 0,
    paddingHorizontal: 0,
    borderBottomColor: AppColors.disable,
  },
  selectedField: {
    padding: 0,
  },
  selectedFieldText: {
    color: AppColors.black,
  },
  detailHeader: {
    alignItems: 'center',
    padding: AppValues.padding,
  },
  headerDetailText: {
    ...AppFonts.bold,
    textAlign: 'center',
    fontSize: pixel(17),
  },
});

export default Styles;

const pdfWidth = wdp(100) - AppValues.padding * 2;

export const pdf = StyleSheet.create({
  pdfViewer: {
    flex: 1,
    alignItems: 'center',
  },
  pdfWrapper: {
    borderWidth: 1,
    borderColor: AppColors.accent,
    padding: 1,
  },
  pdf: {
    flex: 1,
    width: pdfWidth,
    height: (pdfWidth * 842) / 595 + 2,
    backgroundColor: AppColors.white,
  },
  action: {
    margin: AppValues.padding,
  },
});
