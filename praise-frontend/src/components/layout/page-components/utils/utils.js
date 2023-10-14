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

