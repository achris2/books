// DOM Elements
const booksWrapper = document.getElementById('books-wrapper'); 
const checkbox = document.querySelectorAll('.check');
const filterContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const listCounter = document.getElementById('list-counter');
const readingContent = document.getElementById('reading-list');


// initialise listCounterVar
let listCounterVar = 0;

// initialise book cards array 
const bookCards = []; 
let readingList = []; 

// event listeners for filtering & search
filterContainer.addEventListener('change', filterBooks);
searchInput.addEventListener('input', filterBooks);

fetch('./books.json')
    .then(res => res.json())
    .then(data => {
        // loop through
        data.forEach((book) => {
            const bookCard = createBookCard(book);
            bookCards.push(bookCard);
            booksWrapper.appendChild(bookCard);
        })
    }); 

// book card function 
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.dataset.book = JSON.stringify(book);
    bookCard.innerHTML =
    `<div class="item space-y-2 bg-slate-900 rounded px-6 py-6" id="bookcard">
        <div class="relative bg-slate-500 flex justify-center overflow-hidden group cursor-pointer border rounded-xl lg:max-h-[450px]">


    <div class="group relative block bg-black">
        <img
            alt=""
            src="${book.imageLink}"
            class="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity group-hover:opacity-10 "
        />

  <div class="relative p-4 sm:p-6 lg:p-8">
    <p class="text-sm font-medium uppercase tracking-widest text-pink-500">${book.author}</p>
    <p class="text-xl font-bold text-white sm:text-2xl"> ${book.title}</p>

    <div class="mt-32 sm:mt-48 lg:mt-64 lg:max-h-[400px]">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-1 group-hover:opacity-100"
      >
        <p class="text-sm text-white">
        Written in ${book.language}, ${book.year}. 
        </p>
        <!-- Base -->
            <button
            class="status inline-block rounded bg-pink-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-pink-500"
            data-author="${book.author}" 
            data-title="${book.title}"
            >
            +
            </button>
            
        <!-- Border -->

            <a
            class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-pink-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-pink-500"
            href="${book.link}"
            target="_blank" 
            rel="noopener noreferrer"
            >
            Wiki
            </a>
                    
      </div>
    </div>
    </div>
  </div>
</a>
</div>
`
    const addButton = bookCard.querySelector('.status'); 
    addButton.addEventListener('click', updateReadingList);
    return bookCard; 
}

function renderUpdatedList() {
    readingContent.innerHTML = '';
    readingList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title}, ${item.author}`
        readingContent.appendChild(listItem);
    })
}

function updateReadingList(e) {
    const statusEl = e.target;
    const author = statusEl.getAttribute('data-author');
    const title = statusEl.getAttribute('data-title');

    // access nearest element in the DOM 

    if (statusEl.classList.contains('added')) {
        // remove from list 
        statusEl.classList.remove('added');
        statusEl.innerText = "+";
        statusEl.classList.remove('bg-slate-600');
        statusEl.classList.add('bg-pink-600');

        // update listCounter
        listCounterVar--; 

        // remove author from "reading-list"
        const index = readingList.findIndex(item => item.author === author && item.title === title); 
        if (index !== -1) {
            readingList.splice(index, 1);
        }

    } else {
        // add to list 
        statusEl.classList.add('added');
        statusEl.innerText = "-";
        statusEl.classList.remove('bg-pink-600');
        statusEl.classList.add('bg-slate-600');

        // update listCounter
        listCounterVar++;

        // push title and author to reading list 
        readingList.push({ author: author, title: title });
    }

    // update listCounter
    listCounter.innerText = listCounterVar.toString();

    // update reading list 
    renderUpdatedList(); 
}


// generate search string

function generateSearchString(book) {
    return [
        book.title,
        book.author,
        book.language,
        book.country,
        book.category,
        book.year.toString()
    ].join(" ").toLowerCase();
} 

// filter books by search input & filters 

function filterBooks() {
    // get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // get checked filtered categories 
    const checkedCategories = Array.from(checkbox)
        .filter((check) => check.checked)
        .map((checked) => checked.id);
    
    console.log(checkedCategories);
    
    // loop through book cards and check for checked categories
    bookCards.forEach((bookCard, index) => {
        // retrieve book data 
        const book = JSON.parse(bookCard.dataset.book);

        // check if book matches search term or checked categories
        const matchesSearchTerm = generateSearchString(book).includes(searchTerm);
        const matchesCategories = checkedCategories == 0 || checkedCategories.includes(book.category.toLowerCase());

        // show or hide book card

        if (matchesSearchTerm && matchesCategories) {
            bookCard.classList.remove('hidden');
        } else {
            bookCard.classList.add('hidden');
        }
    })
}


function displayReadingList(book) {
    
}