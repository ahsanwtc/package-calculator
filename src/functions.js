import moment from 'moment';
import { jsPDF } from "jspdf";

import { EXPENSES, PLACEHOLDER, STRINGS, DEFAULT_PRICELIST } from './constants';
import logo from './logo.png';

export const getNewTravelingArray = ({ days, traveling = [] }) => {
  let result = null;
  const initCost = 5000;
  if (days > 0 && traveling.length !== days) {
    result = Array.apply(null, new Array(days)).map((_, i) => {
      return traveling[i] ? traveling[i] : initCost;
    });
  }
  return result ? result : traveling;
};

export const calculateTotalCost = (items = []) => {
  return items.reduce((cost, current) => {
    return parseInt(cost) + parseInt(current);
  }, 0);
};

// export const calculateExternalCost = ({ days, number, cost }) => parseInt(days) * parseInt(number) * parseInt(cost);
export const calculateExternalCost = ({ expense = [], price = 1 }) => {
  return expense.reduce((total, current) => {
    return total + parseInt(current.value) * parseInt(price);
  }, 0);
};

export const getDispatchParams = ({ name, value }) => {
  const numberRegex = new RegExp(/^[0-9]+$/i);
  if ((name !== undefined && name !== null && name.length > 0) && (numberRegex.test(value) || value.length === 0)) {
    const nameArray = name.split('-');
    const type = nameArray[0];
    let dispatch = '', expense = nameArray[1];
    const index = parseInt(nameArray[2]) - 1;

    switch(type) {
      case 'cost': {
        dispatch = 'updatePricelist';
        break;
      }
      case 'days': {
        dispatch = 'setPackageDays';
        break;
      }
      case 'quantity': {
        if (expense === 'deliverable') {
          expense = nameArray[2];
          dispatch = 'updateDeliverable';
        } else {
          dispatch = 'updateExpense';
        }
        break;
      }
      case 'advance': {
        dispatch = 'payAdvance';
        break;
      }
      case 'client': {
        dispatch = 'updateClient';
        break;
      }
      default:
        return null;
    }

    return { dispatch, index, expense };
  }

  return null;
};

export const calculateNewExpenseArray = ({ expense, days, property }) => {
  let result = null;
  if (days > 0 && expense.length !== days) {
    result = Array.apply(null, new Array(days)).map((_, i) => {
      return expense[i] ? expense[i] : { 
        label: calculateTags({ expense: property, index: i, type: 'label' }),
        name: calculateTags({ expense: property, index: i, type: 'name' }),
        value: parseInt(getPriceOrQuantity({ expense: property }))
      };
    });
  }
  return result ? result : expense;
};

export const getPriceOrQuantity = ({ expense }) => (expense === EXPENSES.travelling) ? DEFAULT_PRICELIST.travelling : 0;
export const calculateTags = ({ expense, index, type }) => STRINGS[EXPENSES[expense]][type].replace(PLACEHOLDER, index + 1);

const getRightAlignX = ({ fontSize, unitsWidth }) => {
  const pointsToMillFactor = 0.352778;
  const gutter = 10;
  const lenght = unitsWidth * pointsToMillFactor * fontSize;
  return 210 - gutter - lenght;
};

export const generatePDF = props => {
  const { client, videoCameras, photoCameras, drones, usbs, albums, advance, clientQuote, days } = props;

  const doc = new jsPDF();
    doc.setTextColor('#3b5249');
    doc.setDrawColor('#3b5249');
    doc.setFillColor('#3b5249');

    doc.addImage(logo, 'PNG', 10, 10, 40, 40);

    doc.setFontSize(16);
    doc.setFont('Helvetica', 'bold');
    doc.text('Hassan Javed Photography &\nFilms', 60, 15);

    doc.setFontSize(10);
    doc.setFont('Helvetica', '');
    doc.text('2nd Floor sh 206 Rania Mall Bank Rd. Sadder', 60, 28);
    doc.text('Rawalpindi', 60, 33);
    doc.text('+92 3405921363', 60, 39);
    doc.text('hassan.jav3d@gmail.com ', 60, 44);

    const invoiceType = (advance > 0) ? 'TYPE: INVOICE' : 'TYPE: QUOTE';
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(invoiceType, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(invoiceType) }), 10);

    if (advance > 0) {
      const invoiceNumber = `HJ${moment().format('DDMMYHHmm')}`;
      doc.setFont('Helvetica', '');
      doc.setFontSize(10);
      doc.text(invoiceNumber, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(invoiceNumber) }), 14);
    }
    
    const dateText = 'DATE';
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(dateText, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(dateText) }), 24);
    doc.setFont('Helvetica', '');
    doc.setFontSize(10);
    const date = moment().format('MMM D, Y');
    doc.text(date, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(date) }), 28);

    const due = 'DUE';
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(due, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(due) }), 38);
    const onReceipt = 'On Receipt'
    doc.setFont('Helvetica', '');
    doc.setFontSize(10);
    doc.text(onReceipt, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(onReceipt) }), 42);

    const balance = 'BALANCE DUE';
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(balance, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(balance) }), 52);
    const qoute = `PKR Rs: ${clientQuote}/-`;
    doc.setFont('Helvetica', '');
    doc.setFontSize(10);
    doc.text(qoute, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(qoute) }), 56);

    doc.line(10, 65, 200, 65);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('BILL TO', 10, 77);
    
    doc.setFontSize(16);
    doc.text(client.name, 10, 87);
    
    doc.setFontSize(10);
    doc.setFont('Helvetica', '');
    doc.text(client.phone, 10, 93);

    doc.line(10, 105, 200, 105);
    doc.setFont('Helvetica', 'bold');
    doc.text('DESCRIPTION', 10, 112);
    // doc.text('QTY', 150, 112);
    const amountText = 'QTY';
    doc.text(amountText, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(amountText) }), 112);
    doc.line(10, 116, 200, 116);

    
    
    doc.setLineDashPattern([0.5, 0.5], 0);
    let y = 122;
    doc.setFont('Helvetica', '');
    doc.setFontSize(10);
    doc.text('Number of days in the package', 10, y);
    doc.text(`${days}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${days}`) }), y);
    const textOffset = 6;
    y += textOffset;    
    doc.text('Videographers', 10, y);
    doc.text(`${videoCameras}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${videoCameras}`) }), y);
    y += textOffset;
    doc.text('Photographers', 10, y);
    doc.text(`${photoCameras}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${photoCameras}`) }), y);
    y += textOffset;
    doc.text('Drones', 10, y);
    doc.text(`${drones}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${drones}`) }), y);
    y += textOffset;
    doc.text('USBs', 10, y);
    doc.text(`${usbs}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${usbs}`) }), y);
    y += textOffset;
    doc.text('Albums', 10, y);
    doc.text(`${albums}`, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(`${albums}`) }), y);

    y += 10;
    doc.line(10, y, 200, y);
    y += 10;
    const advanceText = `Advance paid: PKR Rs. ${advance}/-`;
    doc.setFontSize(14);
    doc.text(advanceText, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(advanceText) }), y);

    y += 7;
    const totalText = `Total: PKR Rs. ${advance + clientQuote}/-`;
    doc.text(totalText, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(totalText) }), y);

    y += 5;
    doc.setLineDashPattern([], 0);
    const lineX = getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(advanceText) });
    doc.line(lineX, y, 200, y);

    y += 7;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    const balanceText = `Balance Due: PKR Rs. ${clientQuote}/-`;
    doc.text(balanceText, getRightAlignX({ fontSize: doc.getFontSize(), unitsWidth: doc.getStringUnitWidth(balanceText) }), y);

    const fname = `${client.name}-${moment().format('DD-MM-Y')}`;
    const filename = (advance > 0) ? `${fname}-invoice.pdf` : `${fname}-quote.pdf`
    doc.save(filename);
};