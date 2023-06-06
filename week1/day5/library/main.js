class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  
    static fromJSON(json) {
      return new Book(json.title, json.author, json.isbn);
    }
  }
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.title = document.getElementById('title-input');
      this.author = document.getElementById('author-input');
      this.isbn = document.getElementById('isbn-input');
  
      this.tableBody = document.getElementById('table-body');
  
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
  
      this.books = [];
      this.loadBooksFromLocalStorage();
      this.renderBookTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      if (
        this.title.value == '' ||
        this.author.value == '' ||
        this.isbn.value == ''
      ) {
        return;
      }
  
      const book = new Book(this.title.value, this.author.value, this.isbn.value);
  
      this.books.push(book);
  
      this.saveBooksToLocalStorage();
      this.renderBookTable();
  
      this.title.value = '';
      this.author.value = '';
      this.isbn.value = '';
    }
  
    renderBookTable() {
      this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.books.length; i++) {
        const book = this.books[i];
  
        const tr = this.createBookTableRow(book);
        this.tableBody.appendChild(tr);
      }
    }
  
    createBookTableRow(book) {
      const tr = document.createElement('tr');
  
      const tdTitle = document.createElement('td');
      const tdAuthor = document.createElement('td');
      const tdISBN = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdTitle.innerHTML = book.title;
      tdAuthor.innerHTML = book.author;
      tdISBN.innerHTML = book.isbn;
  
      const actionButtons = this.createActionButtons(book);
      tdActions.appendChild(actionButtons[0]);
      tdActions.appendChild(actionButtons[1]);
  
      tr.appendChild(tdTitle);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdISBN);
      tr.appendChild(tdActions);
  
      return tr;
    }
  
    createActionButtons(book) {
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
  
      deleteButton.setAttribute('class', 'btn btn-danger btn-sm');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () =>
        this.onRemoveBookClicked(book)
      );
  
      editButton.setAttribute('class', 'btn btn-warning btn-sm ms-2');
      editButton.innerHTML = 'Edit';
      editButton.addEventListener('click', () => this.onEditBookClicked(book));
  
      return [deleteButton, editButton];
    }

    onRemoveBookClicked(book) {
      this.books = this.books.filter((x) => {
        return book.isbn !== x.isbn;
      });
  
      this.saveBooksToLocalStorage();
      this.renderBookTable();
    }
  
    onEditBookClicked(book) {
      this.books = this.books.filter((x) => {
        return book.isbn !== x.isbn;
      });
  
      this.title.value = book.title;
      this.author.value = book.author;
      this.isbn.value = book.isbn;
  
      this.saveBooksToLocalStorage();
      this.renderBookTable();
    }
  
    saveBooksToLocalStorage() {
      const json = JSON.stringify(this.books);
      localStorage.setItem('books', json);
    }
  
    loadBooksFromLocalStorage() {
      const json = localStorage.getItem('books');
      if (json) {
        const bookArr = JSON.parse(json);
        this.books = bookArr.map((x) => Book.fromJSON(x));
      }
    }
  }
  
  const ui = new UI();