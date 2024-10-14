'use strict';

///////////////////////////////////////
// Modal window

const navLogo = document.querySelector('.nav__logo');
const headerLogo = document.querySelector('.header__img');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.nav__link');
const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.project__tab');
const tabsContainer = document.querySelector('.project__tab-container');
const tabsContent = document.querySelectorAll('.project__content');
const nav = document.querySelector('.nav');
const scrolltoTopBtn = document.querySelector('#scrollToTopBtn');
const allSections = document.querySelectorAll('.section');

//Nav Bar Smooth Scrolling

nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    // Only prevent default for internal links (those with href starting with #)
    if (id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }
});

//Learn More Button Scrolling

learnMoreBtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Sticky Nav Bar

const headerEl = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();

const navFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const observeHeader = new IntersectionObserver(navFunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`,
});

observeHeader.observe(headerEl);

//Reveal sections while scrolling

const secFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const observeSec = new IntersectionObserver(secFunc, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(el => {
  observeSec.observe(el);
  el.classList.add('section--hidden');
});

//Tabbed Component
tabs.forEach(el => {
  el.classList.remove('project__tab--active');
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.project__tab');
  console.log('clicked');
  if (!clicked) return;

  tabs.forEach(el => {
    el.classList.remove('project__tab--active');
  });
  clicked.classList.add('project__tab--active');

  //Project Content
  //Remove Active Content
  tabsContent.forEach(con => {
    con.classList.remove('project__content--active');
  });
  const activeContent = document.querySelector(
    `.project__content--${clicked.dataset.tab}`
  );
  activeContent.classList.add('project__content--active');
});

//Slider Component

let curSlide = 0;
const slides = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
const maxSlide = slides.length;

//Set transform property on each element
slides.forEach((sl, i) => (sl.style.transform = `translateX(${i * 100}%)`));

//Go To Slide
const goToSlide = function (slide) {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - slide)}%)`;
    console.log(i);
  });
};
//Next Slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
//Prevuous Slide
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

//Adding functons to Button
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', previousSlide);

//ScrollToTop Button

const observeFunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    scrolltoTopBtn.classList.add('sticky');
    scrolltoTopBtn.style.display = 'block';
  } else {
    scrolltoTopBtn.classList.remove('sticky');
    scrolltoTopBtn.style.display = 'none';
  }
};

const observerArrow = new IntersectionObserver(observeFunc, {
  root: null,
  threshold: 0,
});

observerArrow.observe(section1);

//Adding Functionality to the Arrow

scrolltoTopBtn.addEventListener('click', function () {
  headerEl.scrollIntoView({ behavior: 'smooth' });
});
