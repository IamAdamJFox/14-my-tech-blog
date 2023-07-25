const format_date = (date) => {
  // Create a new Date object from the input date
  const d = new Date(date);

  // Format the date in MM/DD/YYYY format
  const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  // Format the time in HH:mm format
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  // Combine the formatted date and time
  return `${formattedDate} at ${formattedTime}`;
};

module.exports = { format_date };
