const audio =
  document.getElementById("audio");

const title =
  document.getElementById("title");

const artist =
  document.getElementById("artist");

const cover =
  document.getElementById("cover");

const playBtn =
  document.getElementById("playBtn");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const progress =
  document.getElementById("progress");

const progressContainer =
  document.querySelector(".progress-container");

const currentTimeEl =
  document.getElementById("currentTime");

const durationEl =
  document.getElementById("duration");

const searchInput =
  document.getElementById("searchInput");

const searchResult =
  document.getElementById("searchResult");

const homeBtn =
  document.getElementById("homeBtn");

const searchBtn =
  document.getElementById("searchBtn");

/* =========================
   SONG CARDS
========================= */

const songCards =
  document.querySelectorAll(".song-card");

/* =========================
   SONG ARRAY
========================= */

const songs = [];

songCards.forEach(card => {

  songs.push({

    title:
      card.dataset.title,

    artist:
      card.dataset.artist,

    src:
      card.dataset.song,

    cover:
      card.querySelector("img").src

  });

});

/* =========================
   DEFAULT
========================= */

let currentSongIndex = 0;

audio.volume = 0.7;

/* =========================
   PLAY SONG
========================= */

function playSong(index){

  audio.pause();

  currentSongIndex = index;

  const song = songs[index];

  audio.src = song.src;

  title.innerText =
    song.title;

  artist.innerText =
    song.artist;

  cover.src =
    song.cover;

  audio.play()
    .catch(error =>
      console.log(error)
    );

  setActiveSong(song.src);

}

/* =========================
   ACTIVE SONG
========================= */

function setActiveSong(song){

  songCards.forEach(card => {

    card.classList.remove("active");

    if(card.dataset.song === song){

      card.classList.add("active");

    }

  });

  document
    .querySelector(".song-card.active")
    ?.scrollIntoView({

      behavior:"smooth",

      block:"center"

    });

}

/* =========================
   TOGGLE PLAY
========================= */

function togglePlay(){

  if(!audio.src) return;

  if(audio.paused){

    audio.play();

  }else{

    audio.pause();

  }

}

/* =========================
   NEXT SONG
========================= */

function nextSong(){

  currentSongIndex++;

  if(currentSongIndex >= songs.length){

    currentSongIndex = 0;

  }

  playSong(currentSongIndex);

}

/* =========================
   PREVIOUS SONG
========================= */

function prevSong(){

  currentSongIndex--;

  if(currentSongIndex < 0){

    currentSongIndex =
      songs.length - 1;

  }

  playSong(currentSongIndex);

}

/* =========================
   BUTTONS
========================= */

playBtn.addEventListener(
  "click",
  togglePlay
);

nextBtn.addEventListener(
  "click",
  nextSong
);

prevBtn.addEventListener(
  "click",
  prevSong
);

/* =========================
   AUDIO EVENTS
========================= */

audio.addEventListener(
  "pause",
  () => {

    playBtn.innerText = "▶";

  }
);

audio.addEventListener(
  "play",
  () => {

    playBtn.innerText = "⏸";

  }
);

audio.addEventListener(
  "ended",
  nextSong
);

audio.addEventListener(
  "error",
  () => {

    alert(
      "Lagu gagal dimuat"
    );

  }
);


/* =========================
   CLICK SONG CARD
========================= */

songCards.forEach(
  (card,index) => {

    card.addEventListener(
      "click",
      () => {

        playSong(index);

      }
    );

  }
);

/* =========================
   PAGE SWITCH
========================= */

function showPage(page){

  document
    .getElementById("homePage")
    .classList.add("hidden");

  document
    .getElementById("searchPage")
    .classList.add("hidden");

  homeBtn.classList.remove("active");

  searchBtn.classList.remove("active");

  if(page === "home"){

    document
      .getElementById("homePage")
      .classList.remove("hidden");

    homeBtn.classList.add("active");

  }

  if(page === "search"){

    document
      .getElementById("searchPage")
      .classList.remove("hidden");

    searchBtn.classList.add("active");

  }

}

homeBtn.addEventListener(
  "click",
  () => {

    showPage("home");

  }
);

searchBtn.addEventListener(
  "click",
  () => {

    showPage("search");

  }
);

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  "input",
  () => {

    const filter =
      searchInput.value
      .toLowerCase();

    searchResult.innerHTML = "";

    if(filter === ""){

      searchResult.innerHTML = `
        <p class="empty-state">
          Cari lagu favoritmu...
        </p>
      `;

      return;

    }

    let found = false;

    songs.forEach(
      (song,index) => {

        if(

          song.title
          .toLowerCase()
          .includes(filter)

          ||

          song.artist
          .toLowerCase()
          .includes(filter)

        ){

          found = true;

          const clone =
            songCards[index]
            .cloneNode(true);

          clone.addEventListener(
            "click",
            () => {

              playSong(index);

            }
          );

          searchResult
            .appendChild(clone);

        }

      }
    );

    if(!found){

      searchResult.innerHTML = `
        <p class="empty-state">
          Lagu tidak ditemukan
        </p>
      `;

    }

  }
);

/* =========================
   UPDATE PROGRESS
========================= */

audio.addEventListener(
  "timeupdate",
  updateProgress
);

function updateProgress(){

  const {
    duration,
    currentTime
  } = audio;

  if(isNaN(duration)) return;

  const progressPercent =
    (currentTime / duration) * 100;

  progress.style.width =
    `${progressPercent}%`;

  /* CURRENT TIME */

  let currentMinutes =
    Math.floor(currentTime / 60);

  let currentSeconds =
    Math.floor(currentTime % 60);

  if(currentSeconds < 10){

    currentSeconds =
      "0" + currentSeconds;

  }

  currentTimeEl.innerText =
    `${currentMinutes}:${currentSeconds}`;

  /* DURATION */

  let durationMinutes =
    Math.floor(duration / 60);

  let durationSeconds =
    Math.floor(duration % 60);

  if(durationSeconds < 10){

    durationSeconds =
      "0" + durationSeconds;

  }

  durationEl.innerText =
    `${durationMinutes}:${durationSeconds}`;

}

/* =========================
   SEEK SONG
========================= */

progressContainer
.addEventListener(
  "click",
  setProgress
);

function setProgress(e){

  const width =
    progressContainer.clientWidth;

  const clickX =
    e.offsetX;

  const duration =
    audio.duration;

  if(!isNaN(duration)){

    audio.currentTime =
      (clickX / width)
      * duration;

  }

}