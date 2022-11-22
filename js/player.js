const trackList = [
  {
    title: "SANGRIA",
    author: "ADDLY MUFF",
    file: "ADDLY MUFF - SANGRIA.mp3",
    url: "https://soundcloud.com/addly-muff-789787054"
  },
  {
    title: "THRILLSYESIR",
    author: "DISMESS",
    file: "DISMESS - THRILLSYESIR.mp3",
    url: "https://soundcloud.com/bless_dis_mess"
  },
  {
    title: "MALILLAINDUSTRIAL",
    author: "EROSION",
    file: "EROSION - MALILLAINDUSTRIAL.mp3",
    url: "https://soundcloud.com/user-760632533"
  },
  {
    title: "MININO",
    author: "KIA",
    file: "KIA - MININO.mp3",
    url: "https://soundcloud.com/oliver-halfenaked"
  },
  {
    title: "BABA",
    author: "RAW",
    file: "RAW_3 - BABA.mp3",
    url: "https://soundcloud.com/alberto-rubi-romero"
  },
  {
    title: "SEXO ANAL",
    author: "ZGF",
    file: "SEXO ANAL - ZGF.mp3",
    url: "https://soundcloud.com/xyxx6000"
  }
];

const tracks = document.querySelector(".tracklist");
const audio = document.querySelector(".audio");
const audio_name = document.querySelector(".track_name");

const play_button = document.querySelector(".play_stop_button");
const play_icon = document.getElementById("play");
const pre_button  = document.querySelector(".pre_track");
const next_button = document.querySelector(".next_track");
const reload_button= document.querySelector(".reload_track");
const random_button= document.querySelector(".random_track");
const skin_button = document.querySelector(".skin_");

const player = document.querySelector(".media_");

const audio_current_time = document.querySelector(".current-time");
const audio_total_time = document.querySelector(".total-duration");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".timeline_slider");


let current_track = null;


//Load Source


// function defaultTrack(trackIndex){
//   play_button.classList.add("active");
//   current_track = trackIndex;
//   audio.src = "audio/cyberixComp/" + trackList[trackIndex].file;
//   changeTitle(trackIndex);
//   x(0, 0);
// }

function loadTracks(){
  trackList.forEach((track, index) => {

    const li = document.createElement("li");
    const link = document.createElement("a");
    // const icon = document.createElement("iframe");
    //
    // icon.src = "https://w.soundcloud.com/icon/?url=" + track.url + "&color=black_white&size=10";
    // icon.className = 'sc_icon';
    // icon.allowtransparency="true";
    // icon.scrolling="false";
    // icon.frameborder="0";


    link.classList.add('tracks');
    link.textContent = track.title + " by " + track.author;
    link.href = "#";
    // link.target = "_blank";
    link.addEventListener("click", () => loadTrack(index));
    li.appendChild(link);
    // link.appendChild(icon);
    tracks.appendChild(li);
    console.log(track.title + " : " + index );
  });
}

function pointerToTrack(n, m){
  const l = document.getElementsByClassName('tracks');
  if(m != null){
    l[m].classList.add('active');
    if(n != null){
      l[n].classList.remove('active');
    }
  }
}

function loadTrack(trackIndex){
  const l = document.getElementsByClassName('tracks');
  if(current_track !== trackIndex){
    pointerToTrack(current_track, trackIndex);
    current_track = trackIndex;
    audio.src = "/audio/cyberixComp/" + trackList[trackIndex].file;
    changeTitle(trackIndex);
    audio_current_time.innerText = "00:00";
    audio_total_time.innerText = audio.duration;
    changeMediaButton();
    track_menu.classList.remove('active')
  }
}



window.addEventListener('load', function(){
  loadTracks();
});

let convertTime = function(time)
{
    let mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    return mins + ':' + secs;
}

//Update UI
progressContainer.addEventListener("click", setProgress);

function setProgress(event){
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}

audio.addEventListener('timeupdate', (event) => {
  updateProgress(event);
  const currentTime = Math.floor(audio.currentTime);
  const duration = Math.floor(audio.duration);
  audio_current_time.innerText = convertTime(currentTime);
  if(isNaN(duration)){
    audio_total_time.innerText = "00:00";
  }else{
    audio_total_time.innerText = convertTime(duration);
  }
}, false);



function updateProgress(event){
  const {duration, currentTime} = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}


function changeTitle(index){
  audio_name.innerText = trackList[index].title + " - " + trackList[index].author ;
  audio_name.href = trackList[index].url;
  audio_name.target = "_blank";
}

audio.addEventListener('ended', function(){
    if(current_track != trackList.length-1){
      loadTrack(current_track + 1);
    }else{
      loadTrack(0);
    }
});


//Control Buttons


play_button.addEventListener('click', changeMediaButton);

function changeMediaButton(){
  // updateControls();
  if(audio.paused && current_track !== null){
    audio.play();
    play_icon.classList.add('bx-stop');
    play_icon.classList.remove('bx-play');
  }else{
    audio.pause();
    play_icon.classList.remove('bx-stop');
    play_icon.classList.add('bx-play');
  }

}


pre_button.addEventListener('click', pre);

function pre() {
  if(!audio.paused){
    if(current_track !== 0){
      loadTrack(current_track - 1);
    } else {
      loadTrack(trackList.length-1);
    }
  }
}

next_button.addEventListener('click', next);

function next(){
  if(!audio.paused){
    if(current_track != trackList.length-1){
      loadTrack(current_track + 1);
    }else{
      loadTrack(0);
    }
  }
}

reload_button.onclick = function() {
  if(!audio.paused){
    audio.currentTime = 0;
  }
}

random_button.onclick = function() {
  let n = Math.floor(Math.random()*trackList.length);
  if(n == current_track){
    n = Math.floor(Math.random()*trackList.length);
    loadTrack(n);
  }else{
    loadTrack(n);
  }
}

const skins = [
  {
    name : 'device_vertical_pink'
  },
  {
    name : 'device_vertical_white',
  },
  {
    name : 'device_vertical_gray',
  }
];

var n = 0;

skin_button.onclick = function() {

  if(n >= skins.length){
    n = 0;
  }
  var path = "url('/img/" + skins[n].name + ".png')";
  player.style.backgroundImage = path;
  // console.log(path);
  n++;
};


window.addEventListener('keydown', function(e){
  if(e.code == 'ShiftRight' || e.code == 'ShiftLeft'){
    track_menu.classList.toggle("active");
  }
});

window.addEventListener('keydown', function(e){
  if(e.code == 'Space'){
    changeMediaButton();
  }
});

window.addEventListener('keydown', function(e){
  if(e.code == 'ArrowRight'){
    next();
  }
});

window.addEventListener('keydown', function(e){
  if(e.code == 'ArrowLeft'){
    pre();
  }
});
