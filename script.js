let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName")
let songItem = Array.from(document.getElementsByClassName("songItem"));


let songs= [
    {songName:"salame ishq", filepath:"songs/1.mp3", coverpath:"covers/1.jpg"},
     {songName:"raja ram", filepath:"songs/2.mp3", coverpath:"covers/2.jpg"},
      {songName:"oye oye", filepath:"songs/3.mp3", coverpath:"covers/3.jpg"},
       {songName:"tu nothi", filepath:"songs/4.mp3", coverpath:"covers/4.jpg"},
        {songName:"dilbar", filepath:"songs/5.mp3", coverpath:"covers/5.jpg"},
         {songName:"aashique", filepath:"songs/6.mp3", coverpath:"covers/7.jpg"},
          {songName:"tere nam", filepath:"songs/7.mp3", coverpath:"covers/7.jpg"},
           {songName:"aaj ki rat", filepath:"songs/8.mp3", coverpath:"covers/8.jpg"},
            {songName:"prem ratan", filepath:"songs/9.mp3", coverpath:"covers/9.jpg"},
             {songName:"dola re dola", filepath:"songs/10.mp3", coverpath:"covers/10.jpg"}
]

songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;   
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    
    });

 // Handle play/pause Click
masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener("timeupdate", ()=>{
     //update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)     
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        makeAllPlays();
        // use currentTarget so clicks on child nodes still map to the control
        songIndex = parseInt(e.currentTarget.id);
        e.currentTarget.classList.remove('fa-play-circle');
        e.currentTarget.classList.add('fa-pause-circle');
        
        // use filepath from songs array to avoid hardcoded index math
        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    });
}); 

document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<0){
        songIndex=9;
    }else{
        songIndex -=1;
    }
     audioElement.src = `songs/${songIndex-1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
});



document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>9){
        songIndex=0;
    }else{
        songIndex +=1;
    }
     audioElement.src = `songs/${songIndex+1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})