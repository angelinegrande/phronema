let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "O.O",
    artist: "NMIXX",
    image: "assets/img/nmixx.jpg",
    path: "assets/music/NMIXX 'O.O' Lyrics (엔믹스 O.O 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "Love Me Like This",
    artist: "NMIXX",
    image: "assets/img/nmixx.jpg",
    path: "assets/music/NMIXX Love Me Like This Lyrics (엔믹스  Love Me Like This 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "Party O'Clock",
    artist: "NMIXX",
    image: "assets/img/nmixx.jpg",
    path: "assets/music/NMIXX Party O'Clock Lyrics (Color Coded Lyrics).mp3",
  },
  {
    name: "Super Shy",
    artist: "New Jeans",
    image: "assets/img/newjeans.png",
    path: "assets/music/NewJeans 'Super Shy' Lyrics (뉴진스 Super Shy 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "ANTIFRAGILE",
    artist: "LE SSERAFIM",
    image: "assets/img/lesserafim.jpg",
    path: "assets/music/LE SSERAFIM 'ANTIFRAGILE' Lyrics (레세라핌 ANTIFRAGILE 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "UNFORGIVEN",
    artist: "LE SSERAFIM",
    image: "assets/img/lesserafim.jpg",
    path: "assets/music/LE SSERAFIM (르세라핌) 'UNFORGIVEN (feat. Nile Rodgers)' Lyrics (Color Coded Lyrics).mp3",
  },
  {
    name: "FEARLESS",
    artist: "LE SSERAFIM",
    image: "assets/img/lesserafim.jpg",
    path: "assets/music/LE SSERAFIM FEARLESS Lyrics (르세라핌 FEARLESS 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "Boombayah",
    artist: "BLACKPINK",
    image: "assets/img/blackpink.jpg",
    path: "assets/music/붐바야 (Boombayah).mp3",
  },
  {
    name: "DDU-DU DDU-DU",
    artist: "BLACKPINK",
    image: "assets/img/blackpink.jpg",
    path: "assets/music/뚜두뚜두 (DDU-DU DDU-DU).mp3",
  },
  {
    name: "How You Like That",
    artist: "BLACKPINK",
    image: "assets/img/blackpink.jpg",
    path: "assets/music/How You Like That.mp3",
  },
  {
    name: "_WANNABE_",
    artist: "ITZY",
    image: "assets/img/itzy.jpg",
    path: "assets/music/ITZY (있지) _WANNABE_ (Color Coded Lyrics EngRomHan가사).mp3",
  },
  {
    name: "CAKE",
    artist: "ITZY",
    image: "assets/img/itzy.jpg",
    path: "assets/music/ITZY 'CAKE' Lyrics (있지 CAKE 가사) (Color Coded Lyrics).mp3",
  },
  {
    name: "_DALLA DALLA",
    artist: "ITZY",
    image: "assets/img/itzy.jpg",
    path: "assets/music/ITZY (있지) _DALLA DALLA(달라달라)_ (Color Coded Lyrics EngRomHan가사).mp3",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
