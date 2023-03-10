export const showDate = (inputDate) => {
  const date = new Date(inputDate);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day}/${month}/${year}`
};

export const showTime = (inputDate) => {
  const date = new Date(inputDate);

  let hour = date.getHours();
  let minute = date.getMinutes();

  return `${hour}:${minute}`
};