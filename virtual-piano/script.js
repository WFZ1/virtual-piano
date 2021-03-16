(function () {
  function playAudio (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  const piano = document.querySelector('.piano'),
        pianoКeys = document.querySelectorAll('.piano-key');

  /* MOUSE CLICK ============================================================ */

  piano.addEventListener('click', (e) => {
    if (e.target.classList.contains('piano-key')) {
      const note = e.target.dataset.note,
            src = `assets/audio/${note}.mp3`;

      playAudio(src);
    }   
  });

  /* KEYBOARD KEY CLICK ============================================================ */

  let letters = [];

  for (key of pianoКeys) {
    if ( key.dataset.letter ) {
      letters[key.dataset.letter] = key.dataset.note;
    }
  }

  window.addEventListener('keydown', (e) => {
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      playAudio(`assets/audio/${ letters[code] }.mp3`);
    }
  });
}());