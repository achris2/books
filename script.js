// DOM Elements
const booksWrapper = document.getElementById('books-wrapper'); 
const checkbox = document.querySelectorAll('.check');
const filterContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const listCounter = document.getElementById('list-counter');


// initialise listCounterVar
let listCounterVar = 0;

// initialise book cards array 
const bookCards = []; 

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
    bookCard.innerHTML =
    `<div class="item space-y-2 bg-slate-900 rounded px-6 py-6">
        <div class="relative bg-slate-500 flex justify-center overflow-hidden group cursor-pointer border rounded-xl lg:max-h-[450]px">


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
            <a
            class="status inline-block rounded bg-pink-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-pink-500"
            href="#"
            >
            +
            </a>
            
        <!-- Border -->

            <a
            class="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-pink-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-pink-500"
            href="${book.link}"
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
    bookCard.querySelector('.status').addEventListener('click', updateReadingList);
    return bookCard
}


function updateReadingList(e) {
    const statusEl = e.target;

    console.log(statusEl);
    if (statusEl.classList.contains('added')) {
        // remove from list 
        statusEl.classList.remove('added');
        statusEl.innerText = "+";
        statusEl.classList.remove('bg-slate-600');
        statusEl.classList.add('bg-pink-600');

        listCounterVar--; 
    } else {
        // add to list 
        statusEl.classList.add('added');
        statusEl.innerText = "-";
        statusEl.classList.remove('bg-pink-600');
        statusEl.classList.add('bg-slate-600');

        listCounterVar++;
    }

    // update listCounter
    listCounter.innerText = listCounterVar.toString();
}