const title = document.getElementById('title');
const author = document.getElementById('author');
const dataContainer = document.getElementById('list-books');
const form = document.forms[0];

let bookObj = [];

function populateLocalStorage() {
  const bookStore = JSON.stringify(bookObj);
  localStorage.setItem('bookstore', bookStore);
}

function deleteBook(event) {
  const bookId = event.target.id;
  bookObj.splice(bookId, 1);
  populateLocalStorage();
  displayBooks(bookObj);
}

function displayBooks(books) {
  let listOfBooks = '';

  books.forEach((book, index) => {
    listOfBooks += `<article class="book">
     <div>${book.title}</div>
     <div>${book.author}</div>
     <div>
         <button type="submit" class="btn-delete" id=${index}>Remove</button>
     </div>
     <hr>
   </article>`;
  });
  dataContainer.innerHTML = listOfBooks;
  if (bookObj.length > 0) {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach((button) => button.addEventListener('click', deleteBook));
  }
}

function copyvalues(e) {
  e.preventDefault();
  bookObj.push({
    title: title.value,
    author: author.value,
  });
  populateLocalStorage();

  displayBooks(bookObj);
  form.reset();
}

window.onload = () => {
  const data = JSON.parse(localStorage.getItem('bookstore'));
  bookObj = data;
  displayBooks(bookObj);
};

form.addEventListener('submit', copyvalues);