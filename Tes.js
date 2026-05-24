const audio = document.getElementById("audio");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const playBtn = document.getElementById("playBtn");

const progress = document.getElementById("progress");

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

/* SONG CARDS */

const songCards =
  document.querySelectorAll(".song-card");
  const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

/* SONG DATA */

const songs = [

  {
    title:"SWAY",
    artist:"Ciata",
    src:"Song/sway.m4a"
  },

  {
    title:"ROCKABYE",
    artist:"Ciata",
    src:"Song/Rockabye.m4a"
  },

  {
    title:"STAYWITHME",
    artist:"Ciata",
    src:"Song/Staywithme.m4a"
  }

];

let currentSongIndex = 0;

/* PLAY SONG */

function playSong(index){

  currentSongIndex = index;

  const song = songs[index];

  audio.src = song.src;

  audio.load();

  title.innerText = song.title;

  artist.innerText = song.artist;

  audio.play()
    .catch(error => console.log(error));

  playBtn.innerText = "⏸";

  setActiveSong(song.src);

}

/* ACTIVE SONG */

function setActiveSong(song){

  songCards.forEach(card => {

    card.classList.remove("active");

    if(card.dataset.song === song){
      card.classList.add("active");
    }

  });

}

/* TOGGLE PLAY */

function togglePlay(){

  if(audio.src === "") return;

  if(audio.paused){

    audio.play();

    playBtn.innerText = "⏸";

  }else{

    audio.pause();

    playBtn.innerText = "▶";

  }

}

/* PLAY BUTTON */

playBtn.addEventListener("click", togglePlay);

/* UPDATE BUTTON */

audio.addEventListener("pause", () => {
  playBtn.innerText = "▶";
});

audio.addEventListener("play", () => {
  playBtn.innerText = "⏸";
});

/* SONG ENDED */

audio.addEventListener("ended", () => {

  playBtn.innerText = "▶";

  progress.style.width = "0%";

});

/* CLICK SONG CARD */

songCards.forEach(card => {

  card.addEventListener("click", () => {

    const song =
      card.dataset.song;

    const songTitle =
      card.dataset.title;

    const songArtist =
      card.dataset.artist;

    playSong(song, songTitle, songArtist);

  });

});

/* PAGE SWITCH */

const homeBtn =
  document.getElementById("homeBtn");

const searchBtn =
  document.getElementById("searchBtn");

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

homeBtn.addEventListener("click", () => {
  showPage("home");
});

searchBtn.addEventListener("click", () => {
  showPage("search");
});

/* SEARCH */

searchInput.addEventListener("keyup", () => {

  const filter =
    searchInput.value.toLowerCase();

  searchResult.innerHTML = "";

  if(filter === "") return;

  songCards.forEach(card => {

    const songTitle =
      card.querySelector("h3")
      .innerText
      .toLowerCase();

    if(songTitle.includes(filter)){

      const clone =
        card.cloneNode(true);

      clone.addEventListener("click", () => {

        playSong(
          clone.dataset.song,
          clone.dataset.title,
          clone.dataset.artist
        );

      });

      searchResult.appendChild(clone);

    }

  });

});

/* UPDATE PROGRESS */

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

/* SEEK SONG */

progressContainer.addEventListener(
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

  if(duration){

    audio.currentTime =
      (clickX / width) * duration;

  }

}