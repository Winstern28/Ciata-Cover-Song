const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");

// Function to play a song
function playSong(song, songTitle, songArtist) {
  audio.src = song;
  title.innerText = songTitle;
  artist.innerText = songArtist;
  audio.play();
  playBtn.innerText = "⏸";
}

// Function to toggle play/pause
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

// Update play button icon on pause
audio.addEventListener("pause", () => {
  playBtn.innerText = "▶";
});

// Update play button icon on play
audio.addEventListener("play", () => {
  playBtn.innerText = "⏸";
});

// Function to show pages
function showPage(page) {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("searchPage").classList.add("hidden");

  if (page === "home") {
    document.getElementById("homePage").classList.remove("hidden");
  }

  if (page === "search") {
    document.getElementById("searchPage").classList.remove("hidden");
  }
}

// Search functionality
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  let filter = searchInput.value.toLowerCase();
  let homeCards = document.querySelectorAll("#homePage .song-card");
  let searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";

  homeCards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    if (title.includes(filter)) {
      let clone = card.cloneNode(true);
      searchResult.appendChild(clone);
    }
  });
});

// Progress bar elements
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Update progress bar and time display
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  const { duration, currentTime } = audio;
  if (isNaN(duration)) return; // Prevent errors if duration isn't loaded yet

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Format current time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

  // Format duration
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }
  durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
}

// Seek within the song when clicking on progress bar
function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}
// When cloning search results, add click event for playing song
searchResult.querySelectorAll(".song-card").forEach(card => {
  card.onclick = () => {
    const songSrc = card.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extract song path
    const songTitle = card.querySelector("h3").innerText;
    const songArtist = card.querySelector("p").innerText;
    playSong(songSrc, songTitle, songArtist);
  };
});
searchInput.addEventListener("keyup", () => {
  let filter = searchInput.value.toLowerCase();
  let homeCards = document.querySelectorAll("#homePage .song-card");
  let searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";

  if (filter === "") return; // Exit if search is empty

  homeCards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    if (title.includes(filter)) {
      let clone = card.cloneNode(true);
      searchResult.appendChild(clone);
    }
  });
});