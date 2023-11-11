/**
 * Formatea la fecha según como se quiere mostrar en la APP
 * @param dateValue fecha y hora que se desea formatear
 * @returns la fecha y hora formateados
 */
export const formatDate = (dateValue: string) => {
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as Intl.DateTimeFormatOptions;
  const formattedDate = new Date(dateValue).toLocaleString("es-CO", options);
  return formattedDate;
};
