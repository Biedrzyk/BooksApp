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
      rating: 'book__rating__fill',
      filters: '.filters',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderInBooks();
      thisBook.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBook = this;
      thisBook.bookTemplate = document.querySelector(select.templateOf.bookTemplate);
      thisBook.booksList = document.querySelector(select.containerOf.booksList);
      thisBook.form = document.querySelector(classNames.books.filters);
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
    }

    initActions() {
      const thisBook = this;
      const booksElements = document.querySelector(select.containerOf.booksList);
      const booksImage = booksElements.querySelectorAll('.book__image');

      for (let img of booksImage) {
        img.addEventListener('dblclick', function (event) {
          event.preventDefault();
          const img = event.target.offsetParent;    //zadanie 4
          const bookId = img.getAttribute('data-id');     //zadanie 2 i 3
          console.log(thisBook.favoriteBooks);
          if (!img.classList.contains(classNames.books.favoriteBook)) {
            img.classList.add(classNames.books.favoriteBook);
            thisBook.favoriteBooks.push(bookId);
          } else {
            thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookId), 1);
            console.log(thisBook.favoriteBooks);
            img.classList.remove(classNames.books.favoriteBook);
          }
        });
      }
      thisBook.form.addEventListener('change', function (event) {     //zadanie 5.1
        event.preventDefault();
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked) {
            thisBook.filters.push(event.target.value);
            console.log('co jest zaznaczone?', thisBook.filters);
          } else {
            thisBook.filters.splice(thisBook.filters.indexOf(event.target.value));
            console.log('odznaczono', thisBook.filters);
          }
        }
        thisBook.filterBooks();
      });
    }

    filterBooks() {
      const thisBook = this;
      for (let oneBook of this.data) {     //    we are moving through the books
        let shouldBeHidden = false;               //    checking if we need to hide cover of the book
        for (const oneFilter of thisBook.filters) {          //    checking if the book is for adults or non-fiction and should be grayed
          if (!oneBook.details[oneFilter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookChanges = document.querySelector('.book__image[data-id= "' + oneBook.id + '"]');
        console.log('bookChanges', bookChanges);
        if (shouldBeHidden == true) {
          bookChanges.classList.add('hidden');
        } else {
          bookChanges.classList.remove('hidden');
        }
      }
    }

    renderInBooks() { //  zadanie 1
      const thisBook = this;

      for (let book of this.data) {  /*loop for every element - from dataSource.books*/

        const ratingBcg = thisBook.determineRatingBgc(book.rating);

        const ratingWidth = ratingBcg * 10;

        book.ratingBgc = ratingBcg;

        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.bookTemplate(book); /* generate HTML from the template and from data of the book */

        const element = utils.createDOMFromHTML(generatedHTML); /* generate DOM element based on the HTML */

        const booksListContainer = document.querySelector(select.containerOf.booksList);  /*find booksList container and append child to the .books-list*/
        booksListContainer.appendChild(element);
      }
    }
    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  const app = new BooksList();
}
