export const formatText = (text: string) => {
  const formatted = text.replace(/[\r\n]+/g, " ");
  return formatted.replace(/([,;:])\s*/g, "$1\n").trim();
};
