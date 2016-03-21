function setArticleOpacity() {
  var opacity = (Math.min(230, Math.max(0, getWindowSize().height - getWindowOffset(document.getElementById('title')).y - 55)) / 230.0).toFixed(2)
  var element = document.getElementById('article');
  element.style.opacity = opacity.toString();
  element.style.filter  = 'alpha(opacity=' + (100*opacity).toString() + ')'; // IE fallback
}

function onScrollEventHandler(ev) {
  setArticleOpacity()
}

function getWindowSize() {
  var elem = (document.compatMode === "CSS1Compat") ? document.documentElement : document.body;

  return {
    height: elem.clientHeight,
    width: elem.clientWidth
  }
}

function getPosition(element) {
  var xPosition = 0,
      yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft + element.clientLeft);
    yPosition += (element.offsetTop + element.clientTop);
    element = element.offsetParent;
  }

  return {
    x: xPosition,
    y: yPosition
  };
}

function getScroll() {
  return {
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  };
}

function getWindowOffset(element) {
  var pos = getPosition(element),
      scroll = getScroll();

  return {
    x: (pos.x - scroll.x),
    y: (pos.y - scroll.y)
  };
}

function dayOfYear() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
}

// document.onreadystatechange = function () {
//   var state = document.readyState
//   if (state == 'interactive') {
//     //init()
//   } else if (state == 'complete') {
//     initOnCompleteLoad()
//   }
// }

var YOUTUBE_IFRAME=`<iframe width="840" height="473" src="https://www.youtube.com/embed/videoseries?list=#{id}" frameborder="0" allowfullscreen></iframe>`

var WISTIA_IFRAME=`<iframe src="//fast.wistia.net/embed/iframe/#{id}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="480"></iframe><script src="//fast.wistia.net/assets/external/E-v1.js" async>`

// MAIN function
var initOnCompleteLoad = function() {
  var button = document.getElementById("more")
  var article = document.getElementsByClassName("article_inner")[0]

  // random video
  // id: 'PLwik5wPffiuLtBh3C2MPInRbhZRspwYFS', provider: 'youtube', list: true
  // id: 'v01bzsviws', provider: 'wistia'

  // random colors
  var colors = ['#B54568', '#4DB57A', '#4372B5', '#B54528', '#655CB5', '#34ADB8'] //'#848693'
  var color = colors[Math.floor(colors.length * Math.random())]
  document.getElementById('intro').style.backgroundColor = color
  button.style.backgroundColor = color
  document.getElementById('title').style.color = color
  document.getElementById('devtag1').style.backgroundColor = color

  // random excerpt
  var excerpts = document.querySelectorAll(".excerpt div")
  var randomExcerpt = excerpts[dayOfYear() % excerpts.length]
  randomExcerpt.style.display = 'block';

  // random thought
  var thoughts = document.querySelectorAll(".thought div")
  var randomThought = thoughts[dayOfYear() % thoughts.length]
  randomThought.style.display = 'block';

  // expand the article and show einstein photo
  button.addEventListener('click', function(e) {
    article.style.display = 'block';
    //document.getElementById('einstein').style.display = 'block';
    button.style.display = 'none';
  }, false);

  // article opacity on scrolling
  setArticleOpacity()
  var el = window;
  if(el.addEventListener)
      el.addEventListener('scroll', onScrollEventHandler, false);
  else if (el.attachEvent)
      el.attachEvent('onscroll', onScrollEventHandler);

}

(function() {
  initOnCompleteLoad()
})();
