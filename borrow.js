let avaibleBookList = [];
let allBooks = [];
let borrowInput = document.getElementById('borrowInput');
let leavedInput = document.getElementById('leavedInput');
let leaveMessage = document.getElementById('leaveMessage');
let borrowMessage = document.getElementById('borrowMessage');

function init(){
  fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      avaibleBooksArray(data)
      allBooks = data;
    })
}

  function avaibleBooksArray(books){
    books.map(book => {
      if(book.avaible){
        avaibleBookList.push(book)
      }
    })
    createBookList(avaibleBookList)
  }

  function createBookList(books){
    const avaibleBooks = document.getElementById('avaibleBooksList');
    avaibleBooks.innerHtml = '';
    let bookHtml = '';

    books.map(book => {
      bookHtml += `<li>${book.title}</li>`
    })
    avaibleBooks.innerHTML = bookHtml;
  }

document.getElementById('borrowBtn').addEventListener('click', () => {
    let borrowedBook;
    avaibleBookList.map(book => {
      if((borrowInput.value).toLowerCase() === (book.title).toLowerCase()){
        borrowedBook = {title: borrowInput.value, avaible: false}
        updateBackendBorrow(borrowedBook);
        window.location.reload()
      } else{
        borrowMessage.innerHTML=`Tyvärr är boken redan utlånad, eller så har vi den inte alls`
      }
    })
})

document.getElementById('leaveBtn').addEventListener('click', () => {
  let leavedBook;
  allBooks.map(book => {
      if((leavedInput.value).toLowerCase() === (book.title).toLowerCase()){
        leavedBook = {title: leavedInput.value, avaible: true}
        updateBackendLeave(leavedBook);
        window.location.reload()
    } else{
      leaveMessage.innerHTML=`Hmmmmm, den boken kan du inte lämna tillbaka..!`
    }
  })
})

function updateBackendBorrow(book){

  fetch('http://localhost:3000/books/borrow', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(data => {console.log(data)})
}

function updateBackendLeave(book){

  fetch('http://localhost:3000/books/leave', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book)
  })
    .then(res => res.json())
    .then(data => {console.log(data)})
}


init();