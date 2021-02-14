'use strict';
  
window.addEventListener('DOMContentLoaded', () => {

  const anchors = document.querySelectorAll('.anchor');
  for (let anchor of anchors) {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      
      const blockID = anchor.getAttribute('href').substr(1);
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const tabs = selector => {
    const tabPack = document.querySelector(selector),
        tab = tabPack.querySelectorAll('.stocks__title-tab'),
        tabContent = tabPack.querySelectorAll('.stocks__tab');
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
    
    tabPack.addEventListener('click', event => {
      let target = event.target;

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
    const popUp = document.getElementById('popup');
    const popupForm = popUp.querySelector('#form');
    popUp.style.display = 'block';

    const handleClick = e => {
      let { target } = e;
  
      if (target.closest('.popup__close')) {
        popUp.style.display = 'none';
        popupForm.reset();
        document.body.style.overflowY = 'overlay';
      } else {
        target = target.closest('.popup__content');
  
        if (!target) {
          popUp.style.display = 'none';
          popupForm.reset();
          document.body.style.overflowY = 'overlay';
        }
      }
    }
    popUp.addEventListener('click', handleClick);
  };

  const toTop = () => {
    const scrollUp = document.querySelector('.up');
  
    if (scrollUp) {
        scrollUp.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
  
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
  
            if (scrolled >= 900 && scrolled <= 9700) {
                scrollUp.style.display = 'block';
            } else {
                scrollUp.style.display = 'none';
            }
        });
    }
  };

    
  function falidation (selector) {
    const form = document.querySelector(selector);
    form.addEventListener('input', e => {
      const { target } = e;
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

  const domListeners = () => {
    const handleHTMLclick = e => {
      const { target } = e;

      if (target.matches('.popup-btn')) {
        e.preventDefault();
        document.body.style.overflowY = 'hidden';
        togglePopup();
      }
    } // end handleHTMLclick
    document.querySelector('html').addEventListener('click', handleHTMLclick);
  }

  const sendForm = (selector) => {
    const form = document.querySelector(selector);
    const postData = data => fetch('./telegram.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    }); // end postData

    const handlSubmit = e => {
        e.preventDefault();
        // statusMsg.classList.add('active');

        const formData = new FormData(form);        
        const temp = [];

        formData.forEach((val, key) => {
            temp.push(`${key}=${val}`);
        });
        const body = temp.join('&');

        postData(body)
            .then(response => {
                // statusMsg.classList.remove('active');
                if (response.status !== 200) { throw new Error('status network not 200'); }
                console.log(response);
            })
            .catch(error => {
                console.warn(error);
            })
            .finally(() => {
                form.reset();
                // statusMsg.classList.remove('active');
            });
    }; // end submitHandler

    form.addEventListener('submit', handlSubmit);
};

const toggleMenu = () => {
  const menu = document.querySelector('nav.nav-mobile');

  const handlerMenu = event => {
    const target = event.target;

    const activeMenu = () => {
      menu.classList.toggle('active-menu');
      document.body.classList.toggle('overflowHidden');
    };

    if (target.closest('.menu') || (!target.closest('nav.nav-mobile') && menu.classList.contains('active-menu'))) {
      activeMenu();
    } else if (target.closest('.close') || (target.closest('nav.nav-mobile') && target.closest('[href^="#"]'))) {
      activeMenu();
    }
  };

  document.body.addEventListener('click', handlerMenu);
};



  tabs('.stocks__pack-1');
  tabs('.stocks__pack-2');
  tabs('.stocks__pack-3');
  toggleMenu();
  toTop();
  domListeners();
  falidation('.popup__form');
  maskPhone('.popup__phone');
  sendForm('.popup__form');
});