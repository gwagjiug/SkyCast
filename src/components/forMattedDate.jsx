function forMattedDate() {
  const today = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[today.getMonth()]; // 월 이름을 배열에서 가져옴
  const day = today.getDate(); // 일을 가져옴

  return `${month} ${day}`; // "Month Day" 형식의 문자열 반환
}

export default forMattedDate;
