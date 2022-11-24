window.addEventListener('DOMContentLoaded', async (event) => {
    const play = document.getElementById('play');
    const repeat = document.getElementById('repeat');
    const audio = document.getElementById('audio');
    const progressBar = document.getElementById('progressBar');
    const title = document.getElementById('titleSong');
    const author = document.getElementById('authorSong');
    const time = document.getElementById("time-song")

    const img = new Image();
    img.src = '/img/zim.png';
    // wait for change the image

    let updateTime = () => {};
    let updateTitleAndArtist = () => {};
    audio.onloadedmetadata = async function() {
        updateTime = () => {
            let min = Math.floor(audio.currentTime / 60)
            let sec = Math.floor(audio.currentTime % 60)
            let allTime = Math.floor(audio.duration);
            let allMin = Math.floor(allTime / 60);
            let allSec = Math.floor(allTime % 60);
            if(sec < 10) {
                sec = `0${sec}`;
            }
            time.innerText = `${min}:${sec} / ${allMin}:${allSec}`;
            progressBar.value = (audio.currentTime / audio.duration) * 100;
            //Chnage the max value of the progress bar
            progressBar.maxLength = audio.duration;
        }

        updateTime();

        updateTitleAndArtist = () => {
            let titleAndArtist = audio.title.split(' - ');
            title.innerText = titleAndArtist[0];
            author.innerText = titleAndArtist[1];
        }

        updateTitleAndArtist();
    }

    play.addEventListener('click', () => {
        if(play.classList.contains('paused')) {
            play.classList.remove('paused');
            play.classList.remove('fa-play');
            play.classList.add('fa-pause');
            audio.play();
        } else {
            play.classList.add('paused');
            play.classList.add('fa-play');
            play.classList.remove('fa-pause');
            audio.pause();
        }
    });

    play.addEventListener('mouseover', () => {
        play.style.cursor = 'pointer';
        play.style.transform = 'scale(1.1)';
        play.classList.add('hover');
    });

    play.addEventListener('mouseout', () => {
        play.style.cursor = 'default';
        play.style.transform ='scale(1)';
        play.classList.remove('hover')
    });


    audio.addEventListener('timeupdate', () => {
        updateTime();
    });

    progressBar.addEventListener('change', () => {
        audio.currentTime = progressBar.value;
        renderFrame();
        if(!repeat.classList.contains('active') && Math.floor(audio.currentTime) === Math.floor(audio.duration)) {
            play.classList.add('paused');
            play.classList.add('fa-play');
            play.classList.remove('fa-pause');
            audio.pause();
        }
    });

    repeat.addEventListener('click', () => {
        if(audio.loop) {
            audio.loop = false;
            repeat.classList.remove('opacity-100');
            repeat.classList.add('opacity-50');
            repeat.classList.remove('active');
        } else {
            audio.loop = true;
            repeat.classList.add('opacity-100');
            repeat.classList.remove('opacity-50');
            repeat.classList.add('active');
        }
    });

    repeat.addEventListener('mouseover', () => {
        repeat.style.cursor = 'pointer';
        repeat.style.transform = 'scale(1.1)';
        repeat.classList.add('hover');
    });

    repeat.addEventListener('mouseout', () => {
        repeat.style.cursor = 'default';
        repeat.style.transform ='scale(1)';
        repeat.classList.remove('hover')
    });

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = img.width;
    canvas.height = img.height;

    //Make a music visualizer
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 128;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = (WIDTH / bufferLength) * 2;
    let barHeight;
    let x = 0;

    ctx.imageSmoothingEnabled = false;

    function renderFrame() {
        ctx.clearRect(0,0,WIDTH,HEIGHT);

        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        for(let i = 0; i < bufferLength; i++) {
            
            barHeight = dataArray[i] * 8;

            // const r = barHeight + (25 * (i/bufferLength));
            // const g = 250 * (i/bufferLength);
            // const b = 50;

            // Make a rgb, if is a big number, the color is magenta, if is a small number, the color is pink, the colors is in a degradado
            const r = 255;
            const g = 0;
            const b = 255 - (255 * (i/bufferLength));

            ctx.fillStyle = `rgb(${r}, ${g}, ${b}, 0.2)`;
            ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight);

            x += barWidth + 1;

            // Put the image in the canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
        }

    }

    renderFrame();

    
});