const helloElement = document.querySelector(".hello");
const helloContainer = document.querySelector(".hello-container")
const profileContainer = document.querySelector(".profile");
const imageContainer = document.querySelector(".img-container");
const educationHeading = document.querySelector(".education-heading");
const educationHeadingContainer = document.querySelector(
  ".education-heading-container"
);
const container = document.querySelector(".container");
const educationContainer = document.querySelector(".education-container");
const educationElements = document.querySelectorAll(".education-sub-container");

const experienceHeadingContainer = document.querySelector(
  ".experience-heading-container"
);
const experienceHeading = document.querySelector(".experience-heading");

const achievementsContainer = document.querySelector(".achievements-container");

const achievements = document.querySelector(".achievements");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

const thanksContainer = document.querySelector(".thanks-container");
const thanksElement = document.querySelector(".thanks");


window.addEventListener("scroll", () => {
  const offsetY = window.scrollY;
  const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const backgroundPosition = getBackgroundPosition(container).yPos
  container.style.backgroundPositionY = `${offsetY * 0.6}px`;
  const xToY = ((innerWidth * offsetY) / innerHeight) * 2;
  animateHello(xToY, offsetY);
  animateProfile(offsetY);
  animateEducation();
  animateExperince(container);
  animateThanks()
});

const totalContainers = 6
let currentContainer = 0

prevButton.addEventListener('click', () => {
    if(currentContainer <= 0) return
    currentContainer--
    window.scrollTo(0, currentContainer * window.innerHeight);
})
nextButton.addEventListener("click", () => {
  if(totalContainers <= currentContainer) return
    currentContainer++
  window.scrollTo(0, currentContainer * window.innerHeight);
});

const animateHello = (xToY, offsetY) => {
    helloElement.style.transform = `translate(${xToY}%, ${offsetY}px)`;
};

const animateThanks = () => {
    parallax(thanksContainer, thanksElement, "bottom");
}

const animateProfile = (offsetY) => {
  const profileRect = profileContainer.getBoundingClientRect();
  if (profileRect.top <= 200) {
    imageContainer.classList.replace("hidden", "show");
  }
};

const animateEducation = () => {
  parallax(educationHeadingContainer, educationHeading, "right");
  const educationElementsDirection = ["bottom", "zoomOut", "top"];
  if (educationContainer.getBoundingClientRect().top > 0)
    educationElements.forEach((elements, i) =>
      parallax(educationContainer, elements, educationElementsDirection[i])
    );
  else {
    educationElements.forEach((elements, i) =>
      parallax(educationContainer, elements, "bottom")
    );
  }
};

const animateExperince = (parentContainer) => {
  const rect = experienceHeadingContainer.getBoundingClientRect();
  parallax(experienceHeadingContainer, experienceHeading, "bottom");
  const yDirection = rect.height - rect.y;
  if (yDirection > 0)
    parentContainer.style.backgroundColor = `rgba(1,1,1 ,${
      (innerHeight - yDirection) / 400
    })`;
};

const animateAchievements = (container, element) => {
  const rect = container.getBoundingClientRect();
  parallax(experienceHeadingContainer, experienceHeading);
};

const parallax = (container, element, direction) => {
  const offsetY = window.scrollY;
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  const parentContainer = document.querySelector(".container");
  const xToY = ((innerWidth * offsetY) / innerHeight) * 2;
  const rect = container.getBoundingClientRect();
  const yDirection = direction === "right" ? -rect.y : rect.y;
    const move = ((innerWidth * yDirection) / innerHeight) * 2;
const testMoveDown =
 ( parentContainer.getBoundingClientRect().height -
  (parentContainer.getBoundingClientRect().height - rect.top))*2 ;
    if (direction === "bottom") {
      console.log(testMoveDown);
    return (element.style.transform = `translate(0 , ${-testMoveDown}px)`);
  }
  if (direction === "top") {
    return;
  }
  if (direction === "TopRightToBottomLeft") {
    return (element.style.transform = `translate(${move}px, ${-move}px)`);
  }
  if (direction === "leftToRight") {
    return (element.style.transform = `translate(${-move}px, ${-move / 3}%)`);
  }
  if (direction === "rightToLeft") {
    return (element.style.transform = `translate(${move}px, ${-move / 3}%)`);
  }
  if (direction === "zoomOut") {
    // if(yDirection > 850) return
    parentContainer.style.backgroundColor = `rgba(1,1,1 ,${
      (innerHeight - yDirection) / 400
    })`;
  }

  element.style.transform = `translateX(calc(${move}px)`;
};



function getBackgroundPosition(element) {
  const computedStyle = window.getComputedStyle(element);
  const backgroundPosition = computedStyle.getPropertyValue(
    "background-position"
  );

  // Split the position string into x and y components
  const [xPos, yPos] = backgroundPosition
    .split(" ")
    .map((value) => parseFloat(value));

  return { xPos, yPos };
}
