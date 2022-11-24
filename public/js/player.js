window.addEventListener('DOMContentLoaded', async (event) => {
    //Make a promise to await for #time-song and #progressBar
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            if (document.getElementById('time-song') && document.getElementById('progressBar')) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });

    const play = document.getElementById('play');
    const repeat = document.getElementById('repeat');
    const audio = document.getElementById('audio');
    const progressBar = document.getElementById('progressBar');
    const title = document.getElementById('titleSong');
    const author = document.getElementById('authorSong');
    const time = document.getElementById("time-song")

    const img = new Image();
    img.src = '/img/zim.png';

    let isChangingTime = false;

    let updateTime = () => { };
    let updateTitleAndArtist = () => { };
    audio.onloadedmetadata = async function () {
        updateTime = (currentTime) => {
            let min = Math.floor(currentTime / 60)
            let sec = Math.floor(currentTime % 60)
            let allTime = Math.floor(audio.duration);
            let allMin = Math.floor(allTime / 60);
            let allSec = Math.floor(allTime % 60);
            if (sec < 10) {
                sec = `0${sec}`;
            }
            time.innerText = `${min}:${sec} / ${allMin}:${allSec}`;
            if (!isChangingTime) {
                progressBar.value = (currentTime / audio.duration) * 100;
            }
            //Chnage the max value of the progress bar
            progressBar.maxLength = audio.duration;

            if (!repeat.classList.contains('paused') && audio.currentTime === audio.duration) {
                play.classList.add('paused');
                play.classList.add('fa-play');
                play.classList.remove('fa-pause');
                audio.pause();
                //Move the audio to the start
                audio.currentTime = 0;
            }
        }

        updateTime(audio.currentTime);

        updateTitleAndArtist = () => {
            let titleAndArtist = audio.title.split(' - ');
            title.innerText = titleAndArtist[0];
            author.innerText = titleAndArtist[1];
        }

        updateTitleAndArtist();
    }

    function playOrPause() {
        if (audio.paused) {
            play.classList.remove('paused');
            play.classList.remove('fa-play');
            play.classList.add('fa-pause');
            audio.play();
        }
        else {
            play.classList.add('paused');
            play.classList.add('fa-play');
            play.classList.remove('fa-pause');
            audio.pause();
        }
    }

    play.addEventListener('click', () => {
        playOrPause();
    });

    play.addEventListener('mouseover', () => {
        play.style.cursor = 'pointer';
        play.style.transform = 'scale(1.1)';
        play.classList.add('hover');
    });

    play.addEventListener('mouseout', () => {
        play.style.cursor = 'default';
        play.style.transform = 'scale(1)';
        play.classList.remove('hover')
    });


    audio.addEventListener('timeupdate', () => {
        updateTime(audio.currentTime);
    });

    progressBar.addEventListener('change', () => {
        updateTime(audio.currentTime);
    });

    progressBar.addEventListener('mouseover', () => {
        progressBar.style.cursor = 'pointer';
        // Check the moment when the mouse click on the progress bar
        progressBar.addEventListener('mousedown', () => {
            // Now check the moment when the mouse is released
            isChangingTime = true;
            progressBar.addEventListener('mouseup', () => {
                audio.currentTime = progressBar.value * audio.duration / 100;
                isChangingTime = false;
                if(!play.classList.contains('paused')){
                    audio.play();
                }
            }
            )
        });
    });

    //Add a event if the user move the mouse on the progress bar, and change the value but dont unclick the mouse
    progressBar.addEventListener('mousemove', () => {
        if (isChangingTime) {
            audio.currentTime = progressBar.value * audio.duration / 100;
            audio.pause();
        }
    });

    repeat.addEventListener('click', () => {
        if (audio.loop) {
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
        repeat.style.transform = 'scale(1)';
        repeat.classList.remove('hover')
    });

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = img.width;
    canvas.height = img.height;

    // Make the same code but with with a button for activate the visualizer or not
    const visualizerButton = document.getElementById("visualizerButton");
    let visualizerIsActive = false;

    visualizerButton.addEventListener('click', () => {
        if (visualizerIsActive) {
            visualizerIsActive = false;
            visualizerButton.classList.remove('active');
            visualizerButton.classList.remove('opacity-100');
            visualizerButton.classList.add('opacity-50');
        } else {
            visualizerIsActive = true;
            visualizerButton.classList.add('active');
            visualizerButton.classList.add('opacity-100');
            visualizerButton.classList.remove('opacity-50');
        }
    });

    visualizerButton.addEventListener('mouseover', () => {
        visualizerButton.style.cursor = 'pointer';
        visualizerButton.style.transform = 'scale(1.1)';
        visualizerButton.classList.add('hover');
    });

    visualizerButton.addEventListener('mouseout', () => {
        visualizerButton.style.cursor = 'default';
        visualizerButton.style.transform = 'scale(1)';
        visualizerButton.classList.remove('hover')
    });

    let visualizer;

    //Make a music visualizer, only create if the button is clicked, and destroy if the button is clicked again
    visualizerButton.addEventListener('click', () => {
        if (visualizer !== undefined) {
            if (visualizerIsActive) {
                visualizer.isActivated = true;
            } else {
                visualizer.isActivated = false;
            }

        } else {
            visualizer = new Visualizer();
        }
    });

    class Visualizer {
        constructor() {
            this.audioCtx = new (window.webkitAudioContext || window.AudioContext || window.audioContext)();
            this.analyser = this.audioCtx.createAnalyser();
            this.source = this.audioCtx.createMediaElementSource(audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);
            this.analyser.fftSize = 128;

            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);

            this.WIDTH = canvas.width
            this.HEIGHT = canvas.height

            this.barWidth = (this.WIDTH / this.bufferLength) * 2;
            this.x = 0;

            this.isActivated = true;

            ctx.imageSmoothingEnabled = false;

            this.renderFrame();
        }

        renderFrame() {
            requestAnimationFrame(this.renderFrame.bind(this));

            this.x = 0;

            this.analyser.getByteFrequencyData(this.dataArray);

            ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);


            for (let i = 0; i < this.bufferLength; i++) {

                if (this.isActivated) {
                    this.barHeight = this.dataArray[i] * 8;

                    // const r = barHeight + (25 * (i/bufferLength));
                    // const g = 250 * (i/bufferLength);
                    // const b = 50;

                    // Make a rgb, if is a big number, the color is magenta, if is a small number, the color is pink, the colors is in a degradado
                    const r = 255;
                    const g = 0;
                    const b = 255 - (255 * (i / this.bufferLength));

                    ctx.fillStyle = `rgb(${r}, ${g}, ${b}, 0.2)`;
                    ctx.fillRect(this.x, (this.HEIGHT - this.barHeight), this.barWidth, this.barHeight);

                    this.x += this.barWidth + 1;

                    // Put the image in the canvas
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                } else {
                    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                }
            }

        }
    }

});