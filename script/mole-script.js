console.log('js is running');

let score = 0;

const getSadInterval = () =>
  Date.now() + 1000;

  const getHungryInterval = () =>
  Date.now() + Math.floor(Math.random() * 3000) + 2000;

const getKingStatus = () =>
  Math.random() > .9;

/*
return number that is 0 to 18000 plus 2000, which is 0 to 18 seconds plus 2 seconds -- so will always be at least 2 seconds and maybe up to 20 seconds
*/
const getGoneInterval = () =>
  Date.now() + Math.floor(Math.random() * 18000) + 2000;

//Array of mole holes
const MOLES = [{
    node: document.getElementById('hole-0'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-1'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-2'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-3'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-4'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-5'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-6'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-7'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-8'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
  {
    node: document.getElementById('hole-9'),
    status: "sad",
    next: getSadInterval(),
    king: false
  },
];

const getNextStatus = mole => {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.status = "leaving";
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = '../img/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = '../img/mole-leaving.png';
      }
      break;
    case "leaving":
      mole.status = "gone";
      mole.next = getGoneInterval();
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = '../img/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = '../img/mole-hungry.png';
      }
      break;
    case "hungry":
      mole.status = "sad";
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove("hungry");
      if (mole.king) {
        mole.node.children[0].src = '../img/king-mole-sad.png';
      } else {
        mole.node.children[0].src = '../img/mole-sad.png';
      }
      break;
  }
};

const feed = event => {
  if (event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")) {
    return;
  }
  const mole = MOLES[parseInt(event.target.dataset.index)];
  mole.status = "fed";
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "../img/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "../img/mole-fed.png";
  }
  mole.node.children[0].classList.remove('hungry');

  if (score >= 10) {
    win();
  }
  document.querySelector('.worm-container').style.width = `${ 10 * score }%`;
};

const win = () => {
  document.querySelector('.bg').classList.add("hide");
  document.querySelector('.win').classList.remove("hide");
};

let runAgainAt = Date.now() + 100;

const nextFrame = () => {
  const now = Date.now();
  if (runAgainAt <= now) {
    for (let i = 0; i < MOLES.length; i++) {
      if (MOLES[i].next <= now) {
        getNextStatus(MOLES[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame)
}

document.querySelector('.bg').addEventListener("click", feed);

nextFrame();