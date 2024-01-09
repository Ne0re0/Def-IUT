function formatDate(inputDate) {
  const months = [
    'Janv.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juill.', 'Aoît', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
  ];

  const [year, monthIndex, day] = inputDate.split('/').map(Number);
  const month = months[monthIndex - 1];

  return `${day} ${month} ${year}`;
}