const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();
const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");1
let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");
let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/heatwaves.mp3",
    title: "Heat Waves",
    artist: "Glass Animal",
    imgSrc: "./assets/img/glassanimal.png",
  },
  {
    songSrc: "./music/nvgn.mp3",
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    imgSrc: "./assets/img/rickroll.png",
  },
  {
    songSrc: "./music/babyblue.mp3",
    title: "The Other Side Of Paradise'Live'",
    artist: "Glass Animal",
    imgSrc: "./assets/img/theotherside.png",
  },
  {
    songSrc: "./music/bindinglight.mp3",
    title: "Blinding Lights",
    artist: "The Weekend",
    imgSrc: "./assets/img/weekend.png",
  },
  {
    songSrc: "./music/thekidlaroi.mp3",
    title: "STAY",
    artist: "The Kid Laroi",
    imgSrc: "./assets/img/stay.png",
  },
  {
    songSrc: "./music/y2mate.com - Imagine Dragons  Bones Lyrics.mp3",
    title: "Bones",
    artist: "Imagine Dragons",
    imgSrc: "./assets/img/bones.png",
  },
  {
    songSrc: "./music/y2mate.com - Lil Nas X Jack Harlow  INDUSTRY BABY Official Video.mp3",
    title: "Industry Baby",
    artist: "Lil Nas X",
    imgSrc: "./assets/img/industry.png",
  },
  {
    songSrc: "./music/y2mate.com - BoyWithUke  Understand Official Video.mp3",
    title: "Understand",
    artist: "BoyWithUke",
    imgSrc: "./assets/img/understand.png",
  },
  {
    songSrc: "./music/y2mate.com - Aaron Smith  Dancin KRONO Remix  Lyrics.mp3",
    title: "Dancin",
    artist: "Aaron Smith ",
    imgSrc: "./assets/img/dancin.png",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});