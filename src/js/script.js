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
      favoriteBook: 'favorite.books-list',
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

  function initActions () {

    const booksElements = document.querySelector(select.containerOf.booksList);
    const booksImage = booksElements.querySelectorAll('.book__image');

    for (let img of booksImage) {
      img.addEventListener('dblclick', function (event) {
        event.preventDefault();
        img.classList.add('favorite');
        const bookId = img.getAttribute('data-id');
        favoriteBooks.push(bookId);
        console.log(favoriteBooks);
        if(!img.classList.contains('favorite')) {
          img.classList.add(classNames.books.favoriteBook);
          favoriteBooks.push(bookId);
   
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(bookId),1);
          console.log(favoriteBooks);
          img.classList.remove(classNames.books.favoriteBook);
        }
      });
    }
  }
  initActions();
}