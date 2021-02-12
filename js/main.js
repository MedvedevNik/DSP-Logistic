'use strict';
  
window.addEventListener('DOMContentLoaded', () => {

  const anchors = document.querySelectorAll('.anchor'),
      popupName = document.querySelector('.popup__name'),
      popupPhone = document.querySelector('.popup__phone'),
      popupEmail = document.querySelector('.popup__email'),
      popupMess = document.querySelector('.popup__mess');
  console.log(popupMess.value);
  for (let anchor of anchors) {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      
      const blockID = anchor.getAttribute('href').substr(1);
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const clearInput = () => {
    popupEmail.value = '';
    popupName.value = '';
    popupPhone.value = '';
    popupMess.value = '';
  }

  // tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.stocks__header-1'),
        tab = tabHeader.querySelectorAll('.stocks__title-tab'),
        tabContent = document.querySelectorAll('.stocks__tab');

    const toggleTabContent = index => {
      console.log(index);
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

  const togglePopup = () => {
    const popupBtn = document.querySelectorAll('.popup-btn'),
        popUp = document.getElementById('popup');

        popupBtn.forEach(elem => {
          elem.addEventListener('click', e => {
            e.preventDefault();
            popUp.style.display = 'block';
            document.body.style.overflowY = 'hidden';
          });
        });
      
        popUp.addEventListener('click', event => {
          let target = event.target;
      
          if (target.closest('.popup__close')) {
            popUp.style.display = 'none';
            clearInput();
            document.body.style.overflowY = 'overlay';
          } else {
            target = target.closest('.popup__content');
      
            if (!target) {
              popUp.style.display = 'none';
              clearInput();
              document.body.style.overflowY = 'overlay';
            }
          }
        });
  };

    
  const falidation = () => {

    document.body.addEventListener('input', event => {
      const target = event.target;

      if (target.matches('.popup__email')) {
        target.value = target.value.replace(/[^A-Za-z ,.@0-9]/gi, '');
        target.setAttribute('pattern', '[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      }

      if (target.name === 'user_name') {
        target.setAttribute('pattern', '[А-ЯЁ]{1}[а-яё]{1,49}');
        target.setAttribute('maxlength', 50);
        target.value = target.value.replace(/[^А-Яёа-яё ]/gi, '');
      }

      if (target.matches('.popup__mess')) {
        target.value = target.value.replace(/[^А-ЯЁа-яё ,.?!]/gi, '');
      }
    });
  };

  function maskPhone(selector, masked = '+7(___)___-__-__') {
    const elems = document.querySelectorAll(selector);
  
    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      let i = 0,
        newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }
  
    }
  
    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  }


  tabs();
  togglePopup();
  falidation();
  maskPhone('.popup__phone');
});