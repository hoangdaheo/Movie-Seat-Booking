const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
//Populate UI
populateUI();
//Set Movie Data
function setMovieData(index, price) {
  localStorage.setItem('selectedMovieIndex', index);
  localStorage.setItem('selectedMoviePrice', price);
}
//Update total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}
//Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
let ticketPrice = +movieSelect.value; //parse into a number
//Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
