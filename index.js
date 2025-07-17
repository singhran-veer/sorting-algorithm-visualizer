import { sleep } from "./utilities.js";
import { SortingAlgorithms } from "./sortingalgo.js";

let nBars = 10;
let numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('stage');
stage.style.width = `${nBars * 30}px`;
const selectAlgorithm = document.getElementById('selectAlgorithm');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

let bars = [];
let barsDivs = [];
const sortingAlgorithms = new SortingAlgorithms();

const start = () => {
  stage.innerHTML = '';
  bars = Array(nBars).fill(0).map(() => ({
    width: 20,
    height: Math.floor(Math.random() * 200) + 1
  }));

  barsDivs = [];
  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.style.width = `${bars[i].width}px`;
    bar.style.height = `${bars[i].height}px`;
    bar.style.left = `${5 + i * 30}px`;
    bar.classList.add('bar');
    barsDivs.push(bar);
    stage.appendChild(bar);
  }
};

async function swapBars(i, j) {
  if (i === j) return;
  
  barsDivs[i].classList.add('swapping');
  barsDivs[j].classList.add('swapping');
  
  [barsDivs[i].style.left, barsDivs[j].style.left] = 
    [`${5 + j * 30}px`, `${5 + i * 30}px`];
  
  [barsDivs[i], barsDivs[j]] = [barsDivs[j], barsDivs[i]];
  
  await sleep(300);
  barsDivs[i].classList.remove('swapping');
  barsDivs[j].classList.remove('swapping');
}

async function highlightCompare(i, j) {
  barsDivs[i].classList.add('comparing');
  barsDivs[j].classList.add('comparing');
  await sleep(100);
  barsDivs[i].classList.remove('comparing');
  barsDivs[j].classList.remove('comparing');
}

async function highlightMerge(i, j) {
  barsDivs[i].classList.add('merge-highlight');
  barsDivs[j].classList.add('merge-highlight');
  await sleep(100);
  barsDivs[i].classList.remove('merge-highlight');
  barsDivs[j].classList.remove('merge-highlight');
}

async function overwriteBar(position, value) {
  barsDivs[position].classList.add('merge-overwrite');
  barsDivs[position].style.height = `${value}px`;
  await sleep(100);
  barsDivs[position].classList.remove('merge-overwrite');
}

const solve = async () => {
  solveBtn.disabled = true;
  generateBtn.disabled = true;
  
  try {
    const array = structuredClone(bars.map(el => el.height));
    const swaps = sortingAlgorithms[selectAlgorithm.value](array);

    for (const swap of swaps) {
      if (swap.type === 'compare') {
        if (selectAlgorithm.value === 'mergeSort') {
          await highlightMerge(swap.firstPosition, swap.lastPosition);
        } else {
          await highlightCompare(swap.firstPosition, swap.lastPosition);
        }
      } 
      else if (swap.type === 'swap') {
        await swapBars(swap.firstPosition, swap.lastPosition);
      }
      else if (swap.type === 'overwrite') {
        await overwriteBar(swap.firstPosition, swap.value);
      }
    }
  } finally {
    solveBtn.disabled = false;
    generateBtn.disabled = false;
  }
};

generateBtn.addEventListener('click', () => {
  nBars = Math.max(1, Math.min(20, parseInt(numbersBars.value, 10)));
  numbersBars.value = nBars;
  stage.style.width = `${nBars * 30}px`;
  start();
});

solveBtn.addEventListener('click', solve);

start();