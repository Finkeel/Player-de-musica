let musics = [
    {title: 'Girl from Ipanema', artist: 'Frank Sinatra and Antônio Carlos Jobim', src:'musicas/9convert.com - The Girl From Ipanema  Frank Sinatra  Antônio Carlos Jobim  Concert Collection.mp3', img:'imagens/MI0002918295.jpg'},
    {title: 'Feel Good Inc', artist: 'Gorillaz', src:'musicas/9convert.com - Feel Good Inc.mp3', img:'imagens/gorillaz-artist-profile.jpg'},
    {title: 'Her Majesty', artist: 'Beatles', src:'musicas/9convert.com - Her Majesty Remastered 2009.mp3', img:'imagens/Beatles_-_Abbey_Road.jpg'}
];

let music = document.querySelector('audio');
let indexMusic = 0;
let musicDuration = document.querySelector('.ending')
let image = document.querySelector('img');
let musicName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');

renderMusic(indexMusic);

document.querySelector('.play-button').addEventListener('click', playMusic);

document.querySelector('.stop-button').addEventListener('click', stopMusic);

music.addEventListener('timeupdate', refreshBar);

document.querySelector('.previous').addEventListener('click', () => {
    indexMusic--;
    if(indexMusic < 0) {
        indexMusic = 2;
    }
    renderMusic(indexMusic);
});


document.querySelector('.next').addEventListener('click', () => {
    indexMusic++;
    if(indexMusic > 2) {
        indexMusic = 0;
    }
    renderMusic(indexMusic);
});



function renderMusic(index){
    music.setAttribute('src', musics[index].src);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musics[index].title;
        artistName.textContent = musics[index].artist;
        image.src = musics[index].img;
        musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));
    });
    stopMusic();
}


function playMusic(){
    music.play();
    music.volume = 0.4;
    document.querySelector('.stop-button').style.display = "block";
    document.querySelector('.play-button').style.display = "none";

}

function stopMusic(){
    music.pause();
    document.querySelector('.stop-button').style.display = "none";
    document.querySelector('.play-button').style.display = "block";
}

function refreshBar(){
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let elapsedTime = document.querySelector('.beginning');
    elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds){
    let minuteField = Math.floor(seconds / 60);
    let secondField = seconds % 60;

    if(secondField < 10){
        secondField = '0' + secondField;
    }
    return minuteField+":"+secondField;
}

