const title = document.querySelector('.title');

const journalCont = document.querySelector('.journal-container');
const viewer = document.querySelector('main');

let height = 0;
let width = 0;

function sizeJournal() {

  if (window.innerWidth >= window.innerHeight) {
    //landscape
    journalCont.style.width = (journalCont.offsetHeight * (3/4)) * 2 + 'px';
    if ((window.innerWidth - 40) < (window.innerHeight - 40) * (8/6)) {
      //center vert
      journalCont.style.width = '100%';
      height = journalCont.offsetWidth * (6/8);
      journalCont.style.height = height + 'px';
      viewer.style.height = height + 'px';
      viewer.style.marginLeft = '20px';
      viewer.style.marginTop = ((window.innerHeight - height) / 2) + 'px';
    } else {
      //center horizontal
      journalCont.style.height = '100%';
      width = journalCont.offsetHeight * (8/6);
      journalCont.style.width = width + 'px';
      viewer.style.width = width + 'px';
      viewer.style.marginLeft = ((window.innerWidth - width) / 2) + 'px';
    }
    viewer.style.fontSize = journalCont.offsetHeight / 35 + 'px';
  } else {
    //portrait
  }

  // //these keep resize fresh
  title.children[1].style.fontSize = '1em';
  title.children[3].style.fontSize = '1em';
  title.children[4].style.fontSize = '1em';

  title.children[1].style.fontSize = (title.offsetWidth / title.children[1].offsetWidth)  + 'em';

  title.children[3].style.fontSize = (title.offsetWidth / title.children[3].offsetWidth)  + 'em';

  title.children[4].style.fontSize = (title.offsetWidth / title.children[4].offsetWidth)  + 'em';

}

const commentsLeaflets = document.querySelectorAll('.comments-leaflet');

commentsLeaflets.forEach(commentLeaflet => {
  commentLeaflet;
});

sizeJournal();

// body.onresize = sizeJournal();
window.addEventListener("resize", sizeJournal);
