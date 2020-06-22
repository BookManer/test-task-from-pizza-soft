import moment from 'moment';

export function parseDate(dateString, split) {
    const [day, month, year] = dateString.split(split);

    return {day, month, year};
}

export function toYearMonthDay(dateString, oldSplit, newSplit='.') {
    const {day,month,year} = parseDate(dateString, oldSplit);
    const newDateString = `${year}${newSplit}${month}${newSplit}${day}`;

    return new Date(newDateString);
}

export function toDayMonthYear(dateString, split) {
    const {day,month,year} = parseDate(dateString, split);
    const newDateString = `${day}${split}${month}${split}${year}`;

    return new Date(newDateString);
}

export function parseFormat(date, format='DD.MM.YYYY') {
    return moment(date).format(format);
}