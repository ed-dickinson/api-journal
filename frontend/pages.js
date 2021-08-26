const directory = 'http://localhost:3000/'; // local test directory

// this is for the front page
async function recentTitles(directory) {
  let path = 'issues/recent';
  const response = await fetch(directory + path, {mode: 'cors'});
  const recents = await response.json();

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

let commentsArray = [];
// commentsArray[2] = 'hi';
// console.log(commentsArray);


async function getIssue(directory, issue) {
  let path = 'issues/' + issue;
  const response = await fetch(directory + path, {mode: 'cors'});
  const result = await response.json();
  return result;
}

async function putIssue(directory, issue, page, rL) {

  try {
    let path = 'issues/' + issue;
    const response = await fetch(directory + path, {mode: 'cors'});
    const result = await response.json();
    page.title.innerHTML = '<span><span class="title-emoji">' + result.emoji + '</span> ' + result.title + ' <span class="title-emoji">' + result.emoji + '</span></span>';

    page.date.innerHTML = result.date;
    page.body.innerHTML = '<big>' + result.content.substr(0,1) + '</big>' + result.content.substr(1);
    pagesArray.push(page.dom);
    page.title.children[0].style.fontSize = (page.title.offsetWidth / page.title.children[0].offsetWidth) * page.title.offsetWidth * 0.024 + 'px';
    let comments = (typeof result.comments);
    //puts comment object in index array
    if (comments == 'object') {
      commentsArray[pagesArray.indexOf(page.dom)-1] = result.comments;
    }
    // console.log(commentsArray);

  } catch (err) {
    // console.log(err);
    page.title.innerHTML = '';
    page.title.style.fontSize = '2em';
    page.body.innerHTML = (rL == 'right') ? '<p class="shrug">🙍</p>'  :
     '<p class="peace">✌️</p>';

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
  innerPagesLoaded.push(no);
}

const frontPage = document.querySelector('.front-page');
const frontisPage = document.querySelector('.frontispiece');
const backPage = document.querySelector('.back-page');
const backtisPage = document.querySelector('.backtispiece');

let pagesArray = [frontPage, frontisPage];

let innerPagesLoaded = [];

setupPage(1);


function checkClassAndAdd(element, classe){
  if (element.classList.contains(classe)){
    element.classList.remove(classe);
  }
  element.classList.add(classe);
}
function checkClassAndRemove(element, classe){
    if (element.classList.contains(classe)){
      element.classList.remove(classe);
    }
}

function fillComments(page) {
  let odd1 = page % 2;
  if (odd1 < 0) {odd1+=2;} // sorts out negativity from - page

  let commentsBody = document.querySelectorAll('.comments-body')[odd1];
  let commentsLeaflet = document.querySelectorAll('.comments-leaflet')[odd1];
  if (commentsBody!=undefined) {
    commentsBody.innerHTML = '';
  }

  if (commentsArray[page]!=undefined) { // fill comments
    commentsArray[page].forEach(comment => {
      commentsBody.innerHTML += '<div class="comment"><div class="comment-body">' + comment.comment + '</div><div class="comment-author">' + comment.name + '</div><div class="comment-date">' + comment.date + '</div></div>';
    });

    commentsLeaflet.classList.add('some');
    commentsLeaflet.classList.remove('none');
    // if (commentsLeaflet.classList.contains('unclickable')) {
    //   commentsLeaflet.classList.remove('unclickable');
    // }
    // if (commentsLeaflet.style.zIndex == -1) {
    //   commentsLeaflet.style.zIndex = 1000;
    // }
    console.log();
  } else {
    if (commentsLeaflet!=undefined) {
      if (commentsLeaflet.classList.contains('some')) {
        commentsLeaflet.classList.remove('some');
        commentsLeaflet.classList.add('none');
      }
      if (commentsLeaflet.classList.contains('up')) {
        setTimeout(function(){ //stops immediate disappear
          if (commentsLeaflet.classList.contains('up')) {
            commentsLeaflet.classList.remove('up');
            commentsLeaflet.classList.add('down');
            // commentsLeaflet.classList.add('unclickable');
            // commentsLeaflet.style.zIndex = -1;
          } // this it to get rid of the blocking comemnt slip- could add a class just to zIndex it

        },1000);

      }
    }
  }
  // } else {
  //   if (commentsLeaflet!=undefined) {
  //     if (commentsLeaflet.classList.contains('some')) {
  //       commentsLeaflet.classList.remove('some');
  //       commentsLeaflet.classList.add('none');
  //     }
  //   }
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

  if (noMorePages == true && pageNo > pagesArray.length - 1) {
    pageNo = pagesArray.length - 1;
  }

  let leaf = pagesArray[pageNo-1];
  let overleaf = pagesArray[pageNo];

  checkClassAndRemove(leaf, 'unturn-page-event-2');
  checkClassAndAdd(leaf, 'turn-page-event-1');

  setTimeout(function(){
    checkClassAndRemove(overleaf, 'unturn-page-event-1');
    checkClassAndAdd(overleaf, 'turn-page-event-2');
    overleaf.style.zIndex = pagesArray.indexOf(overleaf);
  },500);

  //includes is to make sure no double loading
  if ((!noMorePages) && (!innerPagesLoaded.includes(pageNo+1))) {
    setupPage(pageNo+1);//left
  } if ((!noMorePages) && (!innerPagesLoaded.includes(pageNo+2))) {
    setupPage(pageNo+2); //right
  }



  fillComments(pageNo-1);
  fillComments(pageNo);

  // if (commentsArray[pageNo]!=undefined) {
  //   document.querySelector('.comments-body.left').innerHTML = commentsArray
  // }




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
  if (pageNo == -1) {return;}
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
  let leaf = pagesArray[pageNo+2];
  let overleaf = pagesArray[pageNo+1];

  leaf.classList.add('unturn-page-event-1');
  setTimeout(function(){
    overleaf.classList.add('unturn-page-event-2');
  },500);

  fillComments(pageNo-1);
  fillComments(pageNo);

  if (pageNo == -1) {
    checkClassAndRemove(journalCont, 'open-book-event');
    checkClassAndRemove(journalCont, 'unclose-book-event');
    checkClassAndAdd(journalCont, 'unopen-book-event');
    setTimeout(function(){
      journalCont.classList.add('closed');
      journalCont.classList.remove('open');
    },500);
  }

}

function showComments() {
  console.log('show');
  let parent = event.srcElement.parentNode;
  if (parent.classList.contains('down')) {
    parent.classList.add('up');
    parent.classList.remove('down');
  } else {
    parent.classList.add('down');
    parent.classList.remove('up');
  }
};

document.querySelector('.turn-page-clicker').addEventListener('click', turnPage);
document.querySelector('.unturn-page-clicker').addEventListener('click', unturnPage);

// const commentsLeaflets = document.querySelectorAll('.comments-leaflet');

document.querySelectorAll('.comments-arrow').forEach(commentLeaflet => {
  commentLeaflet.addEventListener('click', showComments);
});
