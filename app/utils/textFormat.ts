export const formatText = (text: string) => {
  let formatted = text.replace(/[\r\n]+/g, " ");

  formatted = formatted
    .replace(/([.!?]+)\s*/g, "$1\n\n")
    .replace(/([,;:]+)\s*/g, "$1\n");

  return formatted.trim();
};
