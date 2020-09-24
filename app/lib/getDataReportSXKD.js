export default function (branchs, data, percent, decimal) {
  let dataReport = [];
  let per =
    percent === null || percent === 'undefined' || percent <= 0 ? 1 : percent;
  if (!isEmptyJSON(data)) {
    for (let i = 0; i < branchs.length; i++) {
      let branch = branchs[i];
      let obj = null;
      let bong = 0;
      let baobi = 0;
      let tngf = 0;
      switch (branch.tenTat) {
        case 'Việt Đức':
          obj = {
            x: i + 1,
            y: Number(data.vd),
            text: decimal
              ? formatNumberWithDecimal(data.vd / per, decimal)
              : formatNumberWithoutDecimal(data.vd / per),
          };
          break;
        case 'Việt Thái':
          obj = {
            x: i + 1,
            y: Number(data.vt),
            text: decimal
              ? formatNumberWithDecimal(data.vt / per, decimal)
              : formatNumberWithoutDecimal(data.vt / per),
          };
          break;
        case 'Đại Từ':
          obj = {
            x: i + 1,
            y: Number(data.dt),
            text: decimal
              ? formatNumberWithDecimal(data.dt / per, decimal)
              : formatNumberWithoutDecimal(data.dt / per),
          };
          break;
        case 'SC1':
          obj = {
            x: i + 1,
            y: Number(data.sc1),
            text: decimal
              ? formatNumberWithDecimal(data.sc1 / per, decimal)
              : formatNumberWithoutDecimal(data.sc1 / per),
          };
          break;
        case 'SC2':
          obj = {
            x: i + 1,
            y: Number(data.sc2),
            text: decimal
              ? formatNumberWithDecimal(data.sc2 / per, decimal)
              : formatNumberWithoutDecimal(data.sc2 / per),
          };
          break;
        case 'SC3':
          obj = {
            x: i + 1,
            y: Number(data.sc3),
            text: decimal
              ? formatNumberWithDecimal(data.sc3 / per, decimal)
              : formatNumberWithoutDecimal(data.sc3 / per),
          };
          break;
        case 'PB1':
          obj = {
            x: i + 1,
            y: Number(data.pb1),
            text: decimal
              ? formatNumberWithDecimal(data.pb1 / per, decimal)
              : formatNumberWithoutDecimal(data.pb1 / per),
          };
          break;
        case 'PB2':
          obj = {
            x: i + 1,
            y: Number(data.pb2),
            text: decimal
              ? formatNumberWithDecimal(data.pb2 / per, decimal)
              : formatNumberWithoutDecimal(data.pb2 / per),
          };
          break;
        case 'PB3':
          obj = {
            x: i + 1,
            y: Number(data.pb3),
            text: decimal
              ? formatNumberWithDecimal(data.pb3 / per, decimal)
              : formatNumberWithoutDecimal(data.pb3 / per),
          };
          break;
        case 'PB4':
          obj = {
            x: i + 1,
            y: Number(data.pb4),
            text: decimal
              ? formatNumberWithDecimal(data.pb4 / per, decimal)
              : formatNumberWithoutDecimal(data.pb4 / per),
          };
          break;
        case 'Đồng Hỷ':
          obj = {
            x: i + 1,
            y: Number(data.dh),
            text: decimal
              ? formatNumberWithDecimal(data.dh / per, decimal)
              : formatNumberWithoutDecimal(data.dh / per),
          };
          break;
        case 'Võ Nhai':
          obj = {
            x: i + 1,
            y: Number(data.vn),
            text: decimal
              ? formatNumberWithDecimal(data.vn / per, decimal)
              : formatNumberWithoutDecimal(data.vn / per),
          };
          break;
        case 'Bông':
          bong = data.hasOwnProperty('bong') ? data.bong : 0;
          obj = {
            x: i + 1,
            y: bong,
            text: decimal
              ? formatNumberWithDecimal(bong / per, decimal)
              : formatNumberWithoutDecimal(bong / per),
          };
          break;
        case 'Bao Bì':
          baobi = data.hasOwnProperty('baobi') ? data.baobi : 0;
          obj = {
            x: i + 1,
            y: baobi,
            text: decimal
              ? formatNumberWithDecimal(baobi / per, decimal)
              : formatNumberWithoutDecimal(baobi / per),
          };
          break;

        case 'TNGF':
          tngf = data.hasOwnProperty('tngf') ? data.tngf : 0;
          obj = {
            x: i + 1,
            y: tngf,
            text: decimal
              ? formatNumberWithDecimal(tngf / per, decimal)
              : formatNumberWithoutDecimal(tngf / per),
          };
          break;

        default:
          break;
      }
      if (obj !== null) {
        dataReport.push(obj);
      }
    }
  }
  return dataReport;
}

function isEmptyJSON(obj) {
  return JSON.stringify(obj) === JSON.stringify({});
}

function formatNumberWithDecimal(number, decimal) {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  if (number.length === 0 || number === 0) {
    return '0';
  }
  if (!decimal) {
    decimal = 0;
  }
  return parseFloat(`${number}`)
    .toFixed(decimal)
    .replace(/,/g, function (c, i, a) {
      return i && c !== ',' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
}

function formatNumberWithoutDecimal(number) {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  if (number.length === 0 || number === 0) {
    return '0';
  }
  return parseFloat(`${number}`)
    .toFixed(0)
    .replace(/./g, function (c, i, a) {
      return i && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
}
