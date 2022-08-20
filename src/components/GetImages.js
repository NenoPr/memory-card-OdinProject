export function getImagesFromFolder(difficulty) {
  console.log("get Images Difficulty ->", difficulty.name);

  // if (difficulty.name === "Easy" && gameCards.length) selectedImages = selectedImages.slice(0, 12);
  // else if (difficulty.name === "Normal")
  //   selectedImages = selectedImages.slice(0, 24);
  // else if (difficulty.name === "Hard")
  //   selectedImages = selectedImages.slice(0, 36);
  // else if (difficulty.name === "Master")
  //   selectedImages = selectedImages.slice(0, 56);

  function importAll(r) {
    let images = [];
    r.keys().map((item, index) => {
      images[index] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../images/genshin_impact", false, /\.(png|jpe?g|svg)$/)
  );

  let selectedImages = images;
  shuffle(selectedImages);

  if (difficulty.name === "Easy") selectedImages = selectedImages.slice(0, 3);
  else if (difficulty.name === "Normal")
    selectedImages = selectedImages.slice(0, 24);
  else if (difficulty.name === "Hard")
    selectedImages = selectedImages.slice(0, 36);
  else if (difficulty.name === "Master")
    selectedImages = selectedImages.slice(0, 56);

  // selectedImages.forEach((item) => console.log(item))
  console.log("selectedImages", selectedImages);

  return selectedImages;
}

export function shuffle(array, score) {
  if (!array) return
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  if (score) {
    let arrCompare = array;
    let foundNonPresent = false;
    let changedValues = true;
    let placeRandomSpot = Math.floor(Math.random() * 11);

    arrCompare.forEach((item) => {
      item.replace("/static/media/", "").slice(0, -25);
    });

    for (let i = 0; i < 12; i++) {
      for (let j = 0; i < score.length; i++) {
        if (array[i] !== score[j]) foundNonPresent = true;
      }
      if (foundNonPresent) break;
    }

    if (!foundNonPresent) {
      for (let i = 0; i < arrCompare.length; i++) {
        for (let j = 0; i < score.length; i++) {
          if (arrCompare[i] !== score[j]) {
            array[placeRandomSpot] = array[i];
            changedValues = true;
          }
        }
        if (changedValues) break;
      }
    }
  }

  return array;
}
