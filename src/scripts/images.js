const createFigure = ({ copyright, title, url }) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figCaption = document.createElement('figcaption');

  img.src = url;
  img.alt = title;
  figCaption.textContent = copyright ? `${title} by ${copyright}` : title;

  figure.appendChild(img);
  figure.appendChild(figCaption);
  return figure;
};

const getAPOD = async (daysAgo, retries = 3) => {
  try {
    // 86400000 - one day in miliseconds
    const date = new Date(Date.now() - daysAgo * 86400000)
      .toISOString()
      .replace(/T.*/, ' ');
    const QUERY = `https://api.nasa.gov/planetary/apod?api_key=aAf0Qg5pOXIogxuinyf3jgH9BxlqE6XrpBU6jKb1&date=${date}`;
    const data = await fetch(QUERY).then((res) => res.json());
    return data;
  } catch (e) {
    if (retries > 0) return getAPOD(--retries);
    throw e;
  }
};

const getAPODFigures = async () => {
  let apods = [];
  let i = 0;
  while (apods.length < 3) {
    const apiResponse = await getAPOD(i);
    if (apiResponse.media_type === 'image') {
      apods.push(apiResponse);
    }

    i++;
  }
  return apods.map((apod) => createFigure(apod));
};

const styleFigure = (figure, isCover) => {
  const [img, figCaption] = figure.children;

  figCaption.classList.add('cover-caption');
  figure.classList.add(isCover ? 'cover-figure' : 'secondary-cover-figure');
  img.classList.add(isCover ? 'cover' : 'secondary-cover');

  return figure;
};

const slideshowPrep = (isActive, imgs, btns) => {
  if (isActive) {
    imgs.forEach((img, i) => {
      img.classList.remove('hidden');
      btns.item(i).classList.remove('active-cover-btn');
    });
  } else {
    for (let i = 1; i < 3; i++) {
      imgs.item(i).classList.add('hidden');
    }
    btns.item(0).classList.add('active-cover-btn');
  }
};

const slideCover = (coverImages, btns) => {
  for (let i = 0; i < 3; i++) {
    if (!coverImages.item(i).classList.contains('hidden')) {
      coverImages.item(i).classList.toggle('hidden');
      coverImages.item(i === 2 ? 0 : i + 1).classList.toggle('hidden');
      btns.item(i).classList.toggle('active-cover-btn');
      btns.item(i === 2 ? 0 : i + 1).classList.toggle('active-cover-btn');
      break;
    }
  }
};

const coverSlideshow = () => {
  const mql = window.matchMedia('(min-width: 834px)');
  const coverImages = document.querySelectorAll(
    '.cover-figure, .secondary-cover-figure'
  );
  const slideShowBtns = document.querySelectorAll('.cover-btn');

  let intervalID;
  if (!mql.matches) {
    intervalID = setInterval(slideCover, 5000, coverImages, slideShowBtns);
    slideshowPrep(false, coverImages, slideShowBtns);
  }

  mql.addEventListener('change', (e) => {
    if (e.matches) {
      clearInterval(intervalID);
      slideshowPrep(true, coverImages, slideShowBtns);
    } else {
      intervalID = setInterval(slideCover, 5000, coverImages, slideShowBtns);
      slideshowPrep(false, coverImages, slideShowBtns);
    }
  });
};

const index = async () => {
  const coverSection = document.querySelector('.cover-container');
  const secondaryCoverSection = document.querySelector(
    '.secondary-cover-container'
  );

  const [coverFigure, ...secondaryFigures] = await getAPODFigures();

  const styledCover = styleFigure(coverFigure, true);
  const styledSecondaries = secondaryFigures.map((figure) =>
    styleFigure(figure, false)
  );

  coverSection.prepend(styledCover);
  styledSecondaries.map((figure) => {
    secondaryCoverSection.append(figure);
  });

  coverSlideshow();
};

index();
