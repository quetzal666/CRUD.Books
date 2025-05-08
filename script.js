const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

const apiUrl = '/api/books';

async function fetchBooks() {
  const res = await fetch(apiUrl);
  const books = await res.json();
  bookList.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <strong>${book.title}</strong> - ${book.author}
      <button onclick="deleteBook(${book.id})">Eliminar</button>
      <button onclick="editBook(${book.id})">Editar</button>
    `;
    bookList.appendChild(div);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author })
  });
  form.reset();
  fetchBooks();
});

async function deleteBook(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchBooks();
}

async function editBook(id) {
  const newTitle = prompt('Nuevo título:');
  const newAuthor = prompt('Nuevo autor:');
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle, author: newAuthor })
  });
  fetchBooks();
}

fetchBooks();
