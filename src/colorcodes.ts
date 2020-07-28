// color codes used: "#F1948A", "#BB8FCE ", "#85C1E9", "#73C6B6", "#82E0AA", "#F8C471", "#D7DBDD", "#B2BABB"
//
export const NameBackgroundColor = (index: number | undefined) => {
  if (index === undefined) {
    return "lightgreen";
  }
  const colorArray = ["#F1948A", "#BB8FCE ", "#85C1E9", "#73C6B6", "#82E0AA", "#F8C471", "#D7DBDD", "#f0ead6"];
  const newIndex = index % colorArray.length;

  return colorArray[newIndex];
};
