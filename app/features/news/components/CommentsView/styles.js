import {StyleSheet} from 'react-native';
import AppColors from '../../../../config/colors';
import pixel from '../../../../lib/pixel';
import AppFonts from '../../../../config/fonts';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderTopWidth: 0.5,
    borderTopColor: AppColors.lightGray,
    paddingTop: pixel(10),
  },
  commentBloc: {
    backgroundColor: AppColors.white,
    marginBottom: pixel(10),
  },
  commentContent: {
    flexDirection: 'row',
  },
  avatarBloc: {
    width: pixel(32),
    height: pixel(32),
    borderRadius: pixel(16),
    borderWidth: 1,
    borderColor: AppColors.secondary,
    overflow: 'hidden',
    marginRight: pixel(5),
    marginTop: pixel(5),
  },
  avatar: {
    width: pixel(32),
    height: pixel(32),
    borderRadius: pixel(16),
    overflow: 'hidden',
  },
  contentBloc: {
    flex: 1,
    backgroundColor: AppColors.disable,
    borderRadius: pixel(5),
    padding: pixel(10),
  },
  topBloc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBloc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: pixel(10),
  },
  userName: {
    ...AppFonts.bold,
    fontSize: pixel(15),
    color: AppColors.secondary,
  },
  timeText: {
    ...AppFonts.regular,
    fontSize: pixel(12),
    color: AppColors.deepGrey,
  },
  messageText: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.black,
  },
  childBloc: {
    marginLeft: pixel(40),
  },
  buttonReply: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonReplyText: {
    ...AppFonts.regular,
    fontSize: pixel(14),
    color: AppColors.black,
    marginLeft: pixel(5),
  },
  notAcceptText: {
    ...AppFonts.regular,
    fontSize: pixel(12),
    color: AppColors.red,
  },
});

export default Styles;
