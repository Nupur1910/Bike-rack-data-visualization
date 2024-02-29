window.onscroll = function() {
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  var iconPosition = scrollPercentage * (window.innerHeight - 70); 
  document.getElementById('bikeIcon').style.top = iconPosition + 'px';
};
