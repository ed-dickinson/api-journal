const directory = 'http://localhost:3000/test/';


async function recentTitles(directory) {
  let path = 'issues';
  const response = await fetch(directory + path, {mode: 'cors'});
  const recents = await response.json();
  // console.log(recents);
  const recentPosts = document.querySelector('.recent-posts');
  recents.forEach(recent => {
    recentPosts.innerHTML += recent.title;
    if (recents.indexOf(recent) != recents.length -1) {
      recentPosts.innerHTML += ' &bullet; ';
    }
  })
} recentTitles(directory);

//page 1 must be set up so it's there immediately when you turn the front cover
//on front cover open, set up page 2, if empty, leave empty. and 3 if it exists.
//  if not, then add the backtis piece to the array, so on for 4/5, 6/7

const pagesCont = document.querySelector('.inner-pages');

let noMorePages = false;



async function getIssue(directory, issue) {
  let path = 'issues/' + issue;
  const response = await fetch(directory + path, {mode: 'cors'});
  const result = await response.json();
  console.log(result);
  return result;
}

async function putIssue(directory, issue, page, rL) {

  try {
    let path = 'issues/' + issue;
    const response = await fetch(directory + path, {mode: 'cors'});
    const result = await response.json();
    console.log(result);
    page.title.innerHTML = '<span><span class="title-emoji">' + result.emoji + '</span> ' + result.title + ' <span class="title-emoji">' + result.emoji + '</span></span>';

    console.log(page.title.offsetWidth + '/' + page.title.children[0].offsetWidth);
    page.date.innerHTML = result.date;
    page.body.innerHTML = result.content;
    pagesArray.push(page.dom);
    page.title.children[0].style.fontSize = (page.title.offsetWidth / page.title.children[0].offsetWidth) * page.title.offsetWidth * 0.023 + 'px';

  } catch (err) {
    console.log(err);
    page.title.innerHTML = '';
    page.title.style.fontSize = '2em';
    page.body.innerHTML = (rL == 'right') ? '<BR><BR><BR><BR><p class="shrug">🙍</p>'  :
     '<BR><BR><BR><BR><p class="peace">✌️</p>';

    // if no pages load
    if (issue == 1) {
      document.querySelector('.backtispiece').children[0].children[0].innerHTML = "Something has gone drastically wrong here.<br><br>All the pages seem to be missing from the database.<br><br>Try reloading, and if that don't work, then...  I don't know...  it's a one way ticket to Shrug City, I guess."; 
    }

    if (rL == 'left') {
      pagesArray.push(page.dom);
    } else {
      page.dom.parentNode.removeChild(page.dom);
    }
    noMorePages = true;
    if (pagesArray.includes(backtisPage) != true) {
      pagesArray.push(backtisPage, backPage);
    }
  }

}



function addNode(parent, classes){
  let child = document.createElement('div');
  classes.forEach(classe => {
    child.classList.add(classe);
  });
  parent.appendChild(child);
  return child;
}

function setupPage(no){

  let rL = no % 2 == 1 ? 'right' : 'left';
  let page = addNode(pagesCont, [rL + '-page', 'inner-page', 'page'+no]);
  let content = addNode(page, ['content']);
  let date = addNode(content, ['date']);
  let title = addNode(content, ['title']);
  title.innerHTML = 'title';
  let body = addNode(content, ['body']);
  let pageNo = addNode(content, ['page-no']);
  pageNo.innerHTML = no;

  page.style.zIndex = 999 - no;

  putIssue(directory, no, {title:title,body:body,date:date,dom:page}, rL);

}

const frontPage = document.querySelector('.front-page');
const frontisPage = document.querySelector('.frontispiece');
const backPage = document.querySelector('.back-page');
const backtisPage = document.querySelector('.backtispiece');

let pagesArray = [frontPage, frontisPage];

setupPage(1);


function checkClassAndAdd(element, classe){
  if (element.classList.contains(classe)){
    element.classList.remove(classe);
  }
  element.classList.add(classe);
}
function checkClassAndRemove(element, classe){
  // if (typeof classe == 'string') {
    if (element.classList.contains(classe)){
      element.classList.remove(classe);
    }
  // } else {
  //   classe.forEach(clas => {
  //     if (element.classList.contains(clas)){
  //       element.classList.remove(clas);
  //     }
  //   })
  // }

}

let pageNo = -1;
function turnPage(e) {
  if (pageNo == -1) {
    checkClassAndRemove(journalCont, 'unopen-book-event');
    checkClassAndAdd(journalCont, 'open-book-event');
    setTimeout(function(){
      journalCont.classList.remove('closed');
      journalCont.classList.add('open');
    },500);
  }
  pageNo += 2;
  // console.log(e);
  if (noMorePages == true && pageNo > pagesArray.length - 1) {
    pageNo = pagesArray.length - 1;
  }
  console.log(pageNo);
  console.log(pagesArray.length);

  let leaf = pagesArray[pageNo-1];
  let overleaf = pagesArray[pageNo];

  checkClassAndRemove(leaf, 'unturn-page-event-2');
  // pagesArray[pageNo-1].classList.add('turn-page-event-1');
  checkClassAndAdd(leaf, 'turn-page-event-1');

  setTimeout(function(){
    checkClassAndRemove(overleaf, 'unturn-page-event-1');
    // pagesArray[pageNo].classList.add('turn-page-event-2');
    checkClassAndAdd(overleaf, 'turn-page-event-2');
    // pagesArray[pageNo].style.zIndex = pageNo-2;
    overleaf.style.zIndex = pagesArray.indexOf(overleaf);
  },500);

  if (!noMorePages) {
    setupPage(pageNo+1);//left
  } if (!noMorePages) {
    setupPage(pageNo+2); //right
  }
  // console.log(noMorePages);

  if (pageNo == pagesArray.length - 1) {
    checkClassAndRemove(journalCont, 'unclose-book-event');
    checkClassAndAdd(journalCont, 'close-book-event');
    setTimeout(function(){
      journalCont.classList.remove('open');
      journalCont.classList.add('finished');
    },500);
  }

}

function unturnPage(e) {
  // console.log(e);
  if (pageNo == pagesArray.length - 1) {
    checkClassAndRemove(journalCont, 'close-book-event');
    checkClassAndAdd(journalCont, 'unclose-book-event');
    setTimeout(function(){
      journalCont.classList.remove('finished');
      journalCont.classList.add('open');
    },500);
  }

  pageNo -= 2;
  if (pageNo < -1) {pageNo = -1;}
  // console.log(pageNo);
  let leaf = pagesArray[pageNo+2];
  let overleaf = pagesArray[pageNo+1];

  leaf.classList.add('unturn-page-event-1');
  setTimeout(function(){
    overleaf.classList.add('unturn-page-event-2');
    // pagesArray[pageNo+1].style.zIndex = pageNo-2;
  },500);

  if (pageNo == -1) {
    // checkClassAndRemove(journalCont, ['open-book-event','unclose-book-event']);
    checkClassAndRemove(journalCont, 'open-book-event');
    checkClassAndRemove(journalCont, 'unclose-book-event');
    checkClassAndAdd(journalCont, 'unopen-book-event');
    setTimeout(function(){
      journalCont.classList.add('closed');
      journalCont.classList.remove('open');
    },500);
  }

}

document.querySelector('.turn-page-clicker').addEventListener('click', turnPage);
document.querySelector('.unturn-page-clicker').addEventListener('click', unturnPage);
