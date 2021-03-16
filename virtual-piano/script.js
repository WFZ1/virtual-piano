(function () {
  function playAudio (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  const piano = document.querySelector('.piano');

  piano.addEventListener('click', (e) => {
    if (e.target.classList.contains('piano-key')) {
      const note = e.target.dataset.note,
            src = `assets/audio/${note}.mp3`;

      playAudio(src);
    }   
  });
}());