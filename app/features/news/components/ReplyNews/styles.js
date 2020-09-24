import {StyleSheet} from 'react-native';
import AppColors from '../../../../config/colors';
import AppValues from '../../../../config/values';
import pixel from '../../../../lib/pixel';
import AppFonts from '../../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
  content: {
    backgroundColor: AppColors.white,
    paddingHorizontal: AppValues.padding,
    paddingVertical: pixel(10),
  },
  parentBloc: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pixel(10),
  },
  parentText: {
    ...AppFonts.regular,
    fontSize: pixel(15),
    color: AppColors.black,
  },
  parentUser: {
    ...AppFonts.bold,
    fontSize: pixel(15),
    color: AppColors.secondary2,
  },
  innerContent: {
    flexDirection: 'row',
  },
  avatarBloc: {
    width: pixel(34),
    height: pixel(34),
    borderRadius: pixel(17),
    borderWidth: 1,
    borderColor: AppColors.secondary,
    marginRight: pixel(5),
    overflow: 'hidden',
  },
  avatar: {
    width: pixel(34),
    height: pixel(34),
    borderRadius: pixel(17),
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.disable,
    borderRadius: pixel(20),
    padding: pixel(10),
    paddingTop: pixel(10),
    marginRight: pixel(5),
    minHeight: pixel(36),
    justifyContent: 'center',
  },
  buttonSend: {
    marginTop: pixel(5),
  },
});

export default Styles;
