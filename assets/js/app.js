const title = document.getElementById('title');
const author = document.getElementById('author');
const dataContainer = document.getElementById('list-books');
const form = document.forms[0];

const bookObj = [];

function copyvalues(e) {
    e.preventDefault();
    bookObj.push({
        title: title.value,
        author: author.value
    });
    displayBooks(bookObj);
    form.reset();
    return;
}

function displayBooks(books) {
    let newObj = books[books.length - 1];
    let listofbooks = dataContainer.innerHTML;
    listofbooks += `<article class="book">
  <div>${newObj.title}</div>
  <div>${newObj.author}</div>
  <div>
      <button type="submit" id="rm-btn">Remove</button>
  </div>
  <hr>
</article>
  `
    dataContainer.innerHTML = listofbooks;
}

form.addEventListener('submit', copyvalues);