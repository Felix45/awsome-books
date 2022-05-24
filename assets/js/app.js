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
    document.querySelector('.list-of-books').innerHTML = listOfBooks;
    this.registerDeletebuttons();
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