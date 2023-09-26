export function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return ''; // Verifica si el str es válido
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }