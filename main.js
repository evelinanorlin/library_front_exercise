const bookList = document.getElementById('bookList');

fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    createBookList(data)
  })


function createBookList(books){
    bookList.innerHTML = '';
    let bookHtml = '';

  books.map(book => {
    bookHtml += `<li><a href="#">${book.title}</a></li>`
  bookList.innerHTML = bookHtml;
})}