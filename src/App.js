import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-gradient-to-t from-[#261130] to-[#140D1D] h-screen">
        {/* Make a div square with border color and border radius */}
        <div className="border-[#991367] border-[3px] w-96 h-96"></div>
        { /* Make 3 columns for buttons of music player, the buttons are font awesome icons and is, list, like and share */}
        <div className="flex flex-row justify-center w-96 my-4">
          <div className="flex flex-row gap-32">
            <i class="fas fa-list text-[#991367] text-4xl"></i>
            <i class="fa-regular fa-heart text-[#991367] text-4xl"></i>
            <i class="fas fa-share text-[#991367] text-4xl"></i>
          </div>
        </div>
        {/* Make a div for a song title */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-2xl">The Rebellion</div>
        </div>
        {/* Make a div for a song artist */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-xl">Invaders Must Die</div>
        </div>
        {/* Make a div for the progress bar, the progress bar is a range input, the rage input have a rect border and have the same color of the border of the div */}
        <div className="flex flex-row justify-center w-96 my-4">
          <input type="range" className="w-96 border-[#991367] border-[3px] rounded-[10px] accent-[#991367]"></input>
        </div>
        {/* Make a div for the time of the song */}
        <div className="flex flex-row justify-center w-96">
          <div className="text-[#991367] text-xl">1:17</div>
        </div>
        {/* Make a div for the buttons of the music player, the buttons are font awesome icons and is, list, like and share */}
        <div className="flex flex-row justify-center w-96 my-4">
          <div className="flex flex-row gap-32">
            <i class="fas fa-random text-[#991367] text-4xl"></i>
            <i class="fas fa-step-backward text-[#991367] text-4xl"></i>
            <i class="fas fa-play text-[#991367] text-4xl"></i>
            <i class="fas fa-step-forward text-[#991367] text-4xl"></i>
            <i class="fas fa-redo text-[#991367] text-4xl"></i>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
