import './App.css';

function App() {  

  return (
    <div className="App">
      <audio id="audio" style={{ display: 'none' }} preload="metadata" title='Ghosts - Jacob Tillberg'>
        <source src="/songs/music.mp3" type="audio/mpeg" />
      </audio>
      <header className="App-header bg-gradient-to-t from-[#261130] to-[#140D1D] h-screen">
        {/* Make a div square with border color and border radius */}
        {/* <div className="border-[#991367] border-[3px] w-96 h-96 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/img/zim.png')" }}></div> */}
        { /* Make the same but with a canvas */}
        <canvas id="canvas" className="border-[#991367] border-[3px] w-96 h-96 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/img/zim.png')" }}></canvas>
        <div className="flex flex-row justify-center w-96 my-4">
          <div className="flex flex-row gap-32">
            <i className="fas fa-list text-[#991367] text-4xl"></i>
            <i className="fa-regular fa-heart text-[#991367] text-4xl"></i>
            <i className="fas fa-share text-[#991367] text-4xl"></i>
          </div>
        </div>
        {/* Make a div for a song title */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-2xl" id="titleSong">The Rebellion</div>
        </div>
        {/* Make a div for a song artist */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-xl" id="authorSong">Invaders Must Die</div>
        </div>
        {/* Make a div for the progress bar, the progress bar is a range input, the rage input have a rect border and have the same color of the border of the div */}
        <div className="flex flex-row justify-center w-96 my-4">
          <input type="range" className="w-96 border-[#991367] border-[3px] rounded-[10px] accent-[#991367]" id="progressBar" defaultValue={0} />
        </div>
        {/* Make a div for the time of the song */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-xl" id="time-song">0:00 / 0:00</div>
        </div>
        {/* Make a div for the buttons of the music player, the buttons are font awesome icons and is, list, like and share */}
        <div className="flex flex-row justify-center w-96 my-4">
          <div className="flex flex-row gap-32">
            <i className="fas fa-random text-[#991367] text-4xl"></i>
            <i className="fas fa-step-backward text-[#991367] text-4xl"></i>
            <i className="fas fa-play text-[#991367] text-4xl paused transition-all" id='play'></i>
            <i className="fas fa-step-forward text-[#991367] text-4xl transition-all"></i>
            <i className="fas fa-redo text-[#991367] text-4xl opacity-50" id='repeat'></i>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
