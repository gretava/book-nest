document.addEventListener('booksLoaded', () => {
  displayBookList(window.books); // call fn to display books
  loadMoreBooks();
});

// fn to display book list
function displayBookList(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = books
    .map((book) => {
      const coverUrl = book.isbn
        ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
        : '';
      const bookCover = coverUrl
        ? `<img src="${coverUrl}" alt="Book cover for ${book.title}">`
        : '';
      return `
    <div class="discover-book-info" style="display: none;">
    ${bookCover}
      <h2>${book.title}</h2>
      <h3>${book.author}</h3>
      <div class="book-details">
        <span>${book.page_number} pages</span> <span>|</span>
        <span>${book.publish_year}</span>
      </div>
      <div class="book-genres">
        ${book.genres.map((genre) => `<span>${genre}</span>`).join('')}
      </div>
    </div>
  `;
    })
    .join('');

  // show 9 books initially
  let bookItems = document.querySelectorAll(
    '.discover-section .discover-book-info',
  );
  for (let i = 0; i < 9; i++) {
    if (bookItems[i]) {
      bookItems[i].style.display = 'block';
    }
  }
}

function loadMoreBooks() {
  let loadMoreBtn = document.getElementById('load-more-btn');
  let currentBookItems = 12;

  loadMoreBtn.onclick = () => {
    let bookItems = [
      ...document.querySelectorAll('.discover-section .discover-book-info'),
    ];
    for (let i = currentBookItems; i < currentBookItems + 12; i++) {
      if (bookItems[i]) {
        bookItems[i].style.display = 'block';
      }
    }
    currentBookItems += 12;

    if (currentBookItems >= bookItems.length) {
      loadMoreBtn.style.display = 'none';
    }
  };
}
