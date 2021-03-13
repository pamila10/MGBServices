'use strict';

$(document).ready(function(){
  $('.slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
  });
});

const dropBtn = document.querySelector('#dropBtn'),
dropContent = document.querySelector('#dropContent'),
dropList = document.querySelector('#dropList'),
hamburgerBtn = document.querySelector('.hamburger-button'),
navbarBlock = document.querySelector('#navbarBlock');

// Add drop-button
function addDropBtn() {
    function toggleBtn() { 
        if (dropContent.style.display === 'inline-block') {
            dropContent.style.display = 'none';
            dropBtn.querySelector('.caret-up').style.display = 'none';
            dropBtn.querySelector('.caret-down').style.display = 'inline-block';
        } else {
            dropContent.style.display = 'inline-block';
            dropBtn.querySelector('.caret-up').style.display = 'inline-block';
            dropBtn.querySelector('.caret-down').style.display = 'none';
        }
    }
    dropBtn.addEventListener('pointerenter', toggleBtn);
    // Close drop content
    dropList.addEventListener(('mouseleave'), (e) => {
        if (e.target.id === dropList) {
            dropContent.style.display = 'inline-block';
        } else {
            dropContent.style.display = 'none';
            dropBtn.querySelector('.caret-up').style.display = 'none';
            dropBtn.querySelector('.caret-down').style.display = 'inline-block';
        }
    });
}
addDropBtn();

// Add burger menu
function addBurgerMenu() {
    function toggleMenu() {
        navbarBlock.classList.toggle('active');
        document.body.classList.toggle('hideScroll');
    }
    hamburgerBtn.addEventListener('click', toggleMenu);
}
addBurgerMenu();