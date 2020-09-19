export const NameBackgroundColor = (index: number | undefined) => {
  if (index === undefined) {
    return "lightgreen";
  }
  const colorArray = [
    "#F1948A",
    "#82E0AA",
    "#85C1E9",
    "#D7DBDD",
    "#BB8FCE",
    "#F8C471",
    "#73C6B6",
    "#f0ead6",
  ];
  return colorArray[index % colorArray.length];
};
