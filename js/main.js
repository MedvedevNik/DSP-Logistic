'use strict';
  
window.addEventListener('DOMContentLoaded', () => {

  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      
      const blockID = anchor.getAttribute('href').substr(1);
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.stocks__header-1'),
        tab = tabHeader.querySelectorAll('.stocks__title-tab'),
        tabContent = document.querySelectorAll('.stocks__tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
            tab[i].classList.add('active');
            tabContent[i].classList.remove('d-none');
        } else {
            tab[i].classList.remove('active');
            tabContent[i].classList.add('d-none');
        }
      }
    };
    
    tabHeader.addEventListener('click', event => {
      let target = event.target;

      console.log(target);

      target = target.closest('.stocks__title-tab');

      if (target) {
        tab.forEach((item, i) => {
            if (item === target) {
                toggleTabContent(i);
            }
        });
      }
    });
  };

  tabs();
});