const title = document.querySelector('.title');
const titleX = title.offsetWidth;
// console.log(titleX);

const journalCont = document.querySelector('.journal-container');

let height = 0;
let width = 0;
if (window.innerWidth >= window.innerHeight) {
  //landscape

  journalCont.style.width = (journalCont.offsetHeight * (3/4)) * 2 + 'px';
  if ((window.innerWidth - 40) < (window.innerHeight - 40) * (8/6)) {
    //space sides

    journalCont.style.width = '100%';
    journalCont.style.height = journalCont.offsetWidth * (6/8) + 'px';
  } else {
    //space tops
    journalCont.style.height = '100%';
    journalCont.style.width = journalCont.offsetHeight * (8/6) + 'px';
  }
  document.querySelector('main').style.fontSize = journalCont.offsetHeight / 35 + 'px';
}

// title.children[1].style.fontSize =
//   (
//     (title.offsetWidth - title.children[0].offsetHeight)
//     / title.children[1].offsetWidth
//   ) + 'em';

title.children[1].style.fontSize = (title.offsetWidth / title.children[1].offsetWidth)  + 'em';

title.children[3].style.fontSize = (title.offsetWidth / title.children[3].offsetWidth)  + 'em';

title.children[4].style.fontSize = (title.offsetWidth / title.children[4].offsetWidth)  + 'em';
