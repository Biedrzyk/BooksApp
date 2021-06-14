{
  'use strict';


  const select = {
    templateOf: {
      bookTemplate: '#template-book',   // reference to the template and the books-list
    },
    containerOf: {
      booksList: '.books-list',
    },
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

}