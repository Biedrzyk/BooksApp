{
  'use strict';


  const select = {
    templateOf: {
      bookTemplate: '#template-book',   // reference to the template and the books-list
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
      images: '.books-list .book__image',
    }

  };

  const classNames = {
    books: {
      favoriteBook: 'favorite',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  function renderInBooks() {

    for (let book of dataSource.books) {  /*loop for every element - from dataSource.books*/

      const generatedHTML = templates.bookTemplate(book); /* generate HTML from the template and from data of the book */

      const element = utils.createDOMFromHTML(generatedHTML); /* generate DOM element based on the HTML */

      const booksListContainer = document.querySelector(select.containerOf.booksList);  /*find booksList container and append child to the .books-list*/
      booksListContainer.appendChild(element);
    }
  }

  renderInBooks();

  const favoriteBooks = [];
  const filters = [];
  const searchingFilter = document.querySelector('.filters');

  function initActions() {

    const booksElements = document.querySelector(select.containerOf.booksList);
    const booksImage = booksElements.querySelectorAll('.book__image');

    for (let img of booksImage) {
      img.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const img = event.target.offsetParent;    //zadanie 4
        const bookId = img.getAttribute('data-id');     //zadanie 3
        console.log(favoriteBooks);
        if (!img.classList.contains(classNames.books.favoriteBook)) {
          img.classList.add(classNames.books.favoriteBook);
          favoriteBooks.push(bookId);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          console.log(favoriteBooks);
          img.classList.remove(classNames.books.favoriteBook);
        }
      });
    }

    searchingFilter.addEventListener('change', function (event) {
      event.preventDefault();

      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        if (event.target.checked) {
          filters.push(event.target.value);
          console.log('co jest zaznaczone?', filters);
        } else {
          filters.splice(filters.indexOf(event.target.value));
          console.log('odznaczono', filters);
        }
      }
    });
  }
  initActions();
}

