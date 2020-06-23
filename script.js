const firebaseConfig = {
    apiKey: "AIzaSyBbmu3PyQ-zItx5WHFGiCp1iv13gA-Qlw4",
    authDomain: "lab-hatik.firebaseapp.com",
    databaseURL: "https://lab-hatik.firebaseio.com",
    projectId: "lab-hatik",
    storageBucket: "lab-hatik.appspot.com",
    messagingSenderId: "460265411655",
    appId: "1:460265411655:web:ec7b550bc238c52bf40d62"
};
firebase.initializeApp(firebaseConfig);


const fb = firebase.firestore();
const listeTournée = document.querySelector(".listeTournée")

fb.collection("concert").onSnapshot(querySnapshot =>{
    let liste = ""
    querySnapshot.forEach(doc => {
        let date = doc.data().date.split("-").reverse()
        date = `${date[0]}/${date[1]}<br>${date[2]}`
        liste += `
        <div class="oneEvent">
            <span class="date">${date}</span>
            <div class="lieu">
                <span class="ville">${doc.data().ville}</span>
                <span class="batiment">${doc.data().batiment}</span>
            </div>
            <span class="pays">${doc.data().pays}</span>
            <a class="reserver" href="https://www.digitick.com/fg/tour/hatik/3935">reserver</a>
        </div>
        `
    })
    listeTournée.innerHTML = liste

    /* scroll reveal */

    const revealEl = document.querySelectorAll('.reveal')
    const revealItems = []
    const scrollY = window.scrollY

    for(const _element of revealEl){

        const item = {}
        const bounding = _element.getBoundingClientRect()

        item.element = _element
        item.revealed = false
        item.top = bounding.top
        item.height = bounding.height + scrollY
        
        revealItems.push(item)
    }

    window.addEventListener('resize', () => {
        const scrollY = window.scrollY

        for(const _item of revealItems)
        {
            const bounding = _item.element.getBoundingClientRect()
            _item.top = bounding.top + scrollY
            _item.height = bounding.height
        }
    })

    window.addEventListener('scroll', () => {
        const limit = window.scrollY + window.innerHeight

        for( const item of revealItems){
            if( !item.revealed && limit > item.top + item.height/2){
                item.revealed = true
                item.element.classList.add('revealed')
            }
        }
    })


})

/* CountDown */

const countDownDate = new Date("jun 23, 2020 14:05:00").getTime();

const displayTimer = () =>{
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.querySelector(".countDown").innerHTML = days + " : " + hours + " : "
    + minutes + " : " + seconds;
    
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countDown").innerHTML = "EXPIRED";
    }
}
displayTimer()
const x = setInterval(displayTimer, 1000);


/* scroll */
const header = document.querySelector(".header")


if (window.scrollY != 0) {
    header.classList.add("headerSmall")
}else{
    header.classList.remove("headerSmall")
}
window.addEventListener("scroll",()=>{
    if (window.scrollY != 0) {
        header.classList.add("headerSmall")
    }else{
        header.classList.remove("headerSmall")
    }
})


/* lazy load */

const lazyLoadEl = document.querySelectorAll('.lazy-load')

for(const element of lazyLoadEl)
{
    if(element.complete)
    {
            element.classList.add('loaded')
    }

    element.onload = () => 
    {
            element.classList.add('loaded')
    }
}


// audio

function createAudioPlayer() {
    let audioPlayer;
    let trackList;
    let currentTrack = 0;
    let informationDiv;
    let progressbar;
    let progressbarWidth;
    let progressmeter;

    return {
    init: init,
    };

    function play() {
        audioPlayer.src = trackList[currentTrack].src;
        audioPlayer.play();
    }

    function pause() {
        audioPlayer.pause();
    }

    function seeking(e) {
        let percent = e.offsetX / progressbarWidth;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }

    function displayTime(seconds) {
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds - minutes * 60);
    return minutes+":"+seconds;
    }

    function updateTime() {
    informationDiv.innerHTML = '-- / --'
    informationDiv.innerHTML =
        displayTime(audioPlayer.currentTime) + ' / ' +
        displayTime(audioPlayer.duration);
    let percent = audioPlayer.currentTime / audioPlayer.duration;
    progressmeter.style.width = (percent * progressbarWidth) + 'px';
    }


    function init(playerElement) {
        trackList = JSON.parse(playerElement.textContent);
        trackListLen = trackList.length;
        audioPlayer = new Audio();
        audioPlayer.addEventListener('ended', function() {
            pause();
        });
        audioPlayer.addEventListener('timeupdate', function() {
            updateTime();
        });
        audioPlayer.addEventListener('loadedmetadata', function() {
            updateTime();
        });
    
    
        let playButton = document.createElement('button');
        playButton.innerHTML = '<img src="assets/Page principale/Icones/play-solid.svg" class="controlButtons" alt="Play">';
        playButton.ariaLabel = 'Play';
        playButton.onclick = play;

        let pauseButton = document.createElement('button');
        pauseButton.innerHTML = '<img src="assets/Page principale/Icones/pause-solid.svg" class="controlButtons" alt="pause">';
        pauseButton.ariaLabel = 'Pause';
        pauseButton.onclick = pause;

        let title = document.createElement('span');
        title.className = 'audioTitre'
        title.innerHTML = trackList[0].title;

        let link = document.createElement('a');
        link.className = 'lyricsLink'
        link.href = trackList[0].lyrics
        link.innerHTML = 'Lyrics';
        link.taget = "_blank"

        informationDiv = document.createElement('div');
        informationDiv.className = 'audio-player-info';
        informationDiv.innerHTML = '-- / --'
        progressbar = document.createElement('div');
        progressbar.className = 'audio-player-progressbar';
        progressbar.addEventListener('click', seeking);
        progressmeter = document.createElement('div');
        progressmeter.className = 'audio-player-progressmeter';
        progressbar.append(progressmeter);

        playerElement.innerHTML = '';
        playerElement.append(playButton);
        playerElement.append(pauseButton);
        playerElement.append(title);
        playerElement.append(progressbar);
        playerElement.append(informationDiv);
        playerElement.append(link);

        progressbarWidth = progressbar.offsetWidth;
    }
}

window.onload = function() {
    let audioPlayers = document.querySelectorAll('.audio-player');
    for(let i=0; i<audioPlayers.length; i++) {
    let player = createAudioPlayer();
    player.init(audioPlayers[i]);
    }
}

