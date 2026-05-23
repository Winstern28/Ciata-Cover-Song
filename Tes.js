const audio =
document.getElementById("audio");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const playBtn =
document.getElementById("playBtn");

/* PLAY SONG */

function playSong(song, songTitle, songArtist){

  audio.src = song;

  title.innerText = songTitle;

  artist.innerText = songArtist;

  audio.play();

  playBtn.innerText = "⏸";
}

/* TOGGLE PLAY */

function togglePlay(){

  if(audio.paused){

    audio.play();

    playBtn.innerText = "⏸";

  } else {

    audio.pause();

    playBtn.innerText = "▶";

  }

}

/* AUTO ICON */

audio.addEventListener("pause", () => {

  playBtn.innerText = "▶";

});

audio.addEventListener("play", () => {

  playBtn.innerText = "⏸";

});

/* PAGE */

function showPage(page){

  document.getElementById("homePage")
  .classList.add("hidden");

  document.getElementById("searchPage")
  .classList.add("hidden");

  if(page === "home"){

    document.getElementById("homePage")
    .classList.remove("hidden");

  }

  if(page === "search"){

    document.getElementById("searchPage")
    .classList.remove("hidden");

  }
}

/* SEARCH */

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  let filter =
  searchInput.value.toLowerCase();

  let homeCards =
  document.querySelectorAll("#homePage .song-card");

  let searchResult =
  document.getElementById("searchResult");

  searchResult.innerHTML = "";

  homeCards.forEach(card => {

    let title =
    card.querySelector("h3")
    .innerText.toLowerCase();

    if(title.includes(filter)){

      let clone =
      card.cloneNode(true);

      searchResult.appendChild(clone);

    }
    /* PROGRESS BAR */

const progress =
document.getElementById("progress");

const progressContainer =
document.querySelector(".progress-container");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");

/* UPDATE PROGRESS */

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(){

  const { duration, currentTime } = audio;

  const progressPercent =
  (currentTime / duration) * 100;

  progress.style.width =
  `${progressPercent}%`;

  /* FORMAT TIME */

  let currentMinutes =
  Math.floor(currentTime / 60);

  let currentSeconds =
  Math.floor(currentTime % 60);

  if(currentSeconds < 10){
    currentSeconds = "0" + currentSeconds;
  }

  currentTimeEl.innerText =
  `${currentMinutes}:${currentSeconds}`;

  /* DURATION */

  let durationMinutes =
  Math.floor(duration / 60);

  let durationSeconds =
  Math.floor(duration % 60);

  if(durationSeconds < 10){
    durationSeconds = "0" + durationSeconds;
  }

  if(durationSeconds){
    durationEl.innerText =
    `${durationMinutes}:${durationSeconds}`;
  }
}

/* CLICK PROGRESS */

function setProgress(e){

  const width =
  this.clientWidth;

  const clickX =
  e.offsetX;

  const duration =
  audio.duration;

  audio.currentTime =
  (clickX / width) * duration;
}

  });

});