const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');

// Sadece Bos Koltuklari Seciyoruz
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
       e.target.classList.toggle('selected');
       calculateTotal()      
    }
});

// Farkli Bir Film Secilme Isleminde Hesaplama Islemine Devam Ediyoruz
select.addEventListener('change', function(e) {
    calculateTotal();  
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    // Secilen Koltuklarin indis Numaralarini Array Haline Getiriyoruz
    const selectedSeatsArr = [];

    // Secili Olmayan Koltuklarin indis Numaralarini Array Haline Getiriyoruz
    const seatsArr = [];

    // Secilen Koltuklarin indis Numaralarini Tek Tek Tarama Yapiyoruz
    selectedSeats.forEach(function(seat) {
        
        // Secilen Koltugun indis Numarasini Array Icinde Ekliyoruz
        selectedSeatsArr.push(seat);
    });

    // Secili Olmayan Koltuklarin indis Numaralarini Tek Tek Tarama Yapiyoruz
    seats.forEach(function(seat) {
        
        // Secilen Olmayan Koltugun indis Numarasini Array Icinde Ekliyoruz
        seatsArr.push(seat);
    });

    // Secili Olan Koltuk indis Numaralari Arasinda 
    // Map Fonksiyonu Ile Tarama Islemi Yapiyoruz 
    // [1,3,5]
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {

        // Secili Olmayan Koltuk indis Numarasini Buluyoruz
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {

    // Secili Olan Koltuklarin Bilgilerini Aliyoruz
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Koltuk Secilme Islemi Yapildiginda Hepsini Aliyoruz
    if (selectedSeats !=null && selectedSeats.length > 0) {

        // Tum Koltuk Bilgileri Arasinda Secilen Koltuk Bilgilerini Buluyoruz
        seats.forEach(function(seat, index) {

            // Tum Koltuklar Arasinda Secilen Koltuk Varsa
            // indis Numarasini Buluyoruz
            if (selectedSeats.indexOf(index) > -1) {

                // Secilen Koltugun Bilgilerini indis Numarasi Uzerinden 
                // Secilen Koltuklar Array ine ekliyoruz
                seat.classList.add('selected');
            }
        });
    }

    // Secili Filmlerin Bilgilerini Aliyoruz
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // Secilen Filmin indis Numarasini Aliyoruz
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {

    // Secili Olan Koltuklarin indis Numarasini Local Storage Uzerine JSON Formatinda Ekliyoruz
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));

    // Secili Olan Koltuklarin indis Numarasini Ve Hangi Film Icin Secildigi Bilgisini Ekliyoruz
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}