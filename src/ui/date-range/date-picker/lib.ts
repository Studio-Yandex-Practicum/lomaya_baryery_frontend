export const getMonth = (date: Date): string => {
  const splitMonth = [
    ...date.toLocaleDateString('ru-RU', {
      month: 'long',
    }),
  ];
  splitMonth[0] = splitMonth[0].toUpperCase();

  const monthName = splitMonth.join('');

  return monthName;
};

type TWeekDay =
  | 'понедельник'
  | 'вторник'
  | 'среда'
  | 'четверг'
  | 'пятница'
  | 'суббота'
  | 'воскресенье';

export const getShortenWeekDay = (formattedDate: string) => {
  switch (formattedDate as TWeekDay) {
    case 'понедельник':
      return 'Пн';
    case 'вторник':
      return 'Вт';
    case 'среда':
      return 'Ср';
    case 'четверг':
      return 'Чт';
    case 'пятница':
      return 'Пт';
    case 'суббота':
      return 'Сб';
    case 'воскресенье':
      return 'Вс';
    default:
      return 'error';
  }
};
