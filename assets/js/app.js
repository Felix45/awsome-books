class BookStore {
  constructor() {
    this.objBooks = JSON.parse(localStorage.getItem('bookstore')) || [];
  }

  addBook(title, author) {
    this.objBooks.push({ title, author });
    this.populateLocalStorage();
    this.displayBooks();
  }

  displayBooks() {
    let listOfBooks = '<table class="table table-striped table-sm table-hover">';
    this.objBooks.forEach((book, index) => {
      listOfBooks += `
    <tr>
    <td>${book.title} by ${book.author}</td>
    <td class="d-flex justify-content-end"><button class="btn-delete" id=${index}>Remove</button></td>
    </tr>
      `;
    });
    listOfBooks += '</table>';
    document.querySelector('.list-books').innerHTML = listOfBooks;
    this.registerDeletebuttons();
  }

  registerDeletebuttons() {
    if (this.objBooks.length > 0) {
      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach((button) => button.addEventListener('click', this.deleteBook.bind(this)));
    }
  }

  deleteBook(book) {
    this.objBooks.splice(book.target.id, 1);
    this.populateLocalStorage();
    this.displayBooks();
  }

  populateLocalStorage() {
    const data = JSON.stringify(this.objBooks);
    localStorage.setItem('bookstore', data);
  }
}

const bookstore = new BookStore();
const form = document.forms[0];
const menuItems = document.querySelectorAll('.nav-link');

function showSection() {
  const show = this.getAttribute('data-section');
  menuItems.forEach((menuItem) => { menuItem.classList.remove('active') });
  this.classList.add('active');
  const toggleSections = document.querySelectorAll('.content-area');
  toggleSections.forEach((el) => {
    el.classList.add('d-none');
    document.getElementById(show).classList.remove('d-none');
  });
}

function displayDate() {
  let currentDate = new Date().toDateString();
  document.getElementById('timer').innerHTML = currentDate + ', ' + new Date().toLocaleTimeString('en-US');
}

menuItems.forEach((menuItem) => menuItem.addEventListener('click', showSection));


window.onload = () => { bookstore.displayBooks(); };

setInterval(displayDate, 1000);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookstore.addBook(form.elements.title.value, form.elements.author.value);
  form.reset();
});
