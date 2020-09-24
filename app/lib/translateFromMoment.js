import moment from 'moment';

export default function (start, end) {
  let str = 'N/A';
  if (end) {
    str = moment(end).from(moment(start), true);
    str = str.replace('minutes', 'phút');
    str = str.replace('minute', 'phút');
    str = str.replace('in', '');
    str = str.replace('days', 'ngày');
    str = str.replace('day', 'ngày');
    str = str.replace('hours', 'giờ');
    str = str.replace('hour', 'giờ');
    str = str.replace('an', '1');
    str = str.replace('a', '1');
  }
  return str;
}
