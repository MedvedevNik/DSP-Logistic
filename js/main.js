'use strict';


const anchors = document.querySelectorAll('a[href*="#"]');
  // ancLogo = anchors[0],
  // ancAbout = anchors[1],
  // ancSales = anchors[2];


for (let anchor of anchors) {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    
    const blockID = anchor.getAttribute('href').substr(1);
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}