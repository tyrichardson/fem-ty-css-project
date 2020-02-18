console.log('js is running');

const {
  styler,
  spring,
  listen,
  pointer,
  value
} = window.popmotion;

const ball = document.querySelector('.headerImg');
const divStyler = styler(ball);
const ballXY = value({
  x: 0,
  y: 0
}, divStyler.set);

listen(ball, 'mousedown touchstart')
  .start((e) => {
    e.preventDefault();
    pointer(ballXY.get()).start(ballXY);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    spring({
      from: ballXY.get(),
      velocity: ballXY.getVelocity(),
      to: {
        x: 0,
        y: 0
      },
      stiffness: 200,
      // mass: 1,
      // damping: 10
    }).start(ballXY);
  });

//cats page
let mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // optional pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // optional scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

const LAUNCH_DATE = document.querySelector('.launch-date-div')

const ON_LAUNCH_DATE = document.querySelector('.happened-today');

const HAPPENED_HIDDEN = document.querySelector('.happened');

const HAPPENED_STORY = "https://byabbe.se/on-this-day/2/18/events.json";

let happenedArray = [];

async function getHappened() {
  const res = await fetch(HAPPENED_STORY);
  const resJson = await res.json();
  happenedArray = resJson.events;
  let val = Math.floor(Math.random() * 10);
  ON_LAUNCH_DATE.innerText = `On this date in ${ happenedArray[val].year }, ${ happenedArray[val].description }`;
  HAPPENED_HIDDEN.classList.remove('hidden');
};

LAUNCH_DATE.addEventListener("click", function () {
  getHappened();
});