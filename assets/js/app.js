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
    let listOfBooks = '';
    this.objBooks.forEach((book, index) => {
      listOfBooks += `
      <article>
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div>
          <button class="btn-delete" id=${index}>Remove</button>
        </div>
        <hr/>
      </article>`;
    });
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
window.onload = () => {
  bookstore.displayBooks();
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookstore.addBook(form.elements.title.value, form.elements.author.value);
  form.reset();
});