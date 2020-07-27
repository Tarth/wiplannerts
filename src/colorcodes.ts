// ekstra color codes: #72fcd7, #fce772,
//
export const NameBackgroundColor = (index: number | undefined) => {
  if (index === undefined) {
    console.log(index);
    return "lightgreen";
  }
  const colorArray = ["#fc7272", "#b772fc", "#7292fc", "#72fca0"];

  return colorArray[index];
};
