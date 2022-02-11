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
    "#F5DEB3",
  ];
  return colorArray[index % colorArray.length];
};
