// at some point, replace try...catch with async/await

document.addEventListener('DOMContentLoaded', function () {
  // load navbar on all pages
  fetch('navbar.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.innerHTML = data;
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');

        // Event listener for the burger menu
        burger.addEventListener('click', () => {
          burger.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
      } else {
        console.error('Navbar element not found');
      }
    })
    .catch((error) => console.error('Error loading navbar:', error));

  // fetch JSON data for books
  let books = [];
  fetch('./sample.json')
    .then((res) => res.json())
    .then((data) => {
      window.books = data; // store fetched data in the global variable
      document.dispatchEvent(new Event('booksLoaded')); // dispatch event when books are loaded
      console.log(data);
    });

  // load footer on all pages
  fetch('footer.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.innerHTML = data;
      } else {
        console.error('Footer element not found');
      }
    })
    .catch((error) => console.error('Error loading footer:', error));

  // Redirect to other page
  const showMoreBtn = document.getElementById('show-more-btn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      window.location.href = 'allbookspage.html';
    });
  } else {
    console.error('Show more button not found');
  }

  if (window.location.pathname.endsWith('index.html')) {
    // rotating text
    let words = document.querySelectorAll('.word');
    words.forEach((word) => {
      let letters = word.textContent.split('');
      word.textContent = '';
      letters.forEach((letter) => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = '1';

    let rotateText = () => {
      let currentWord = words[currentWordIndex];
      let nextWord =
        currentWordIndex === maxWordIndex
          ? words[0]
          : words[currentWordIndex + 1];

      // rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = 'letter out';
        }, i * 80);
      });
      // reveal and rotate in letters of next word
      nextWord.style.opacity = '1';
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = 'letter behind';
        setTimeout(() => {
          letter.className = 'letter in';
        }, 340 + i * 80);
      });
      currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    rotateText();
    setInterval(rotateText, 1500);
  }
});
