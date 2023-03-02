const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const pagesInput = document.getElementById('pagesInput');

document.getElementById('sendBtn').addEventListener('click', () => {
  let newBook = {title: titleInput.value, author: authorInput.value, pages: pagesInput.value}
  
  fetch('http://localhost:3000/books/add', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook)
  })
    .then(res => res.json())
    .then(data => {console.log(data)})
});
