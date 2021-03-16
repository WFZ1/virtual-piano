(function () {
  const piano = document.querySelector('.piano'),
        pianoКeys = document.querySelectorAll('.piano-key');
  
  /* PLAY SOUND PIANO KEY ============================================================ */
        
  function playAudio (src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  /* ACTIVATE PIANO KEY ============================================================ */

  function activeKey (key) {
    pianoКeys.forEach(el => {
      if ( el.classList.contains('active') ) {
        el.classList.remove('active');
      }
    });

    key.classList.add('active');
  };

  /* MOUSE CLICK ============================================================ */

  piano.addEventListener('click', (e) => {
    if (e.target.classList.contains('piano-key')) {
      activeKey(e.target);

      const note = e.target.dataset.note,
            src = `assets/audio/${note}.mp3`;

      playAudio(src);
    }   
  });

  /* KEYBOARD KEY CLICK ============================================================ */

  let letters = {};

  for (key of pianoКeys) {
    if ( key.dataset.letter ) {
      letters[key.dataset.letter] = {
        note: key.dataset.note,
        key
      };
    }
  }

  window.addEventListener('keydown', (e) => {
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      activeKey(letters[code].key);
      playAudio(`assets/audio/${ letters[code].note }.mp3`);
    }
  });
}());