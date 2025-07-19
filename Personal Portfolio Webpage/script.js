// adjust #project-tiles width so that tiles wrap around, but also align left & whole container can be centered
const projectTiles = document.getElementById('project-tiles');

function remToPx(rem) {
  console.log();
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * rootFontSize;
}

const tileWidth = remToPx(14) + 70; 
const tilesFit = Math.min(Math.floor(window.innerWidth / tileWidth), 4);
projectTiles.style.width = String(tileWidth * tilesFit) + 'px';


// highlight nav-links if the user is at a certain position in the document
const sections = document.querySelectorAll('section');
let positions = [];
for (section of sections) {
  const rect = section.getBoundingClientRect(); 
  const posY = (rect.top + rect.bottom) / 1.95;
  positions.push(posY);
}

let lastModified = undefined;
const navLinks = document.getElementsByClassName('nav-link');
document.addEventListener('scroll', () => {
  const userPos = window.scrollY + window.innerHeight;
  for (let i = positions.length - 1; i >= 0; i--) {
	if (userPos >= positions[i]) {
	  if (window.scrollY < 48) {
		if (lastModified !== undefined) {
		  lastModified.classList.toggle('highlighted');
		  lastModified = undefined;
		}
		break;
	  }

	  if (lastModified === undefined) {
		lastModified = navLinks[i];
		lastModified.classList.toggle('highlighted');
	  } else if (lastModified !== navLinks[i]) {
		lastModified.classList.toggle('highlighted');
		lastModified = navLinks[i];
		lastModified.classList.toggle('highlighted');
	  }

	  break;
	}
  }
});

