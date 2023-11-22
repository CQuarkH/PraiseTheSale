export function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

export function formatProp(prop) {
  if (prop === "id") return "ID"; 

  return prop
    .replace(/([A-Z])/g, ' $1') 
    .replace(/^./, str => str.toUpperCase()); 
}

export function formatChileanDateTime(dateString) {
  const date = new Date(dateString);

  const twoDigits = (num) => num < 10 ? `0${num}` : num;

  const day = twoDigits(date.getDate());
  const month = twoDigits(date.getMonth() + 1); 
  const year = date.getFullYear();
  const hours = twoDigits(date.getHours());
  const minutes = twoDigits(date.getMinutes());

  return `${day}-${month}-${year} at ${hours}:${minutes}`;
}

