(function () {
  const piano = document.querySelector('.piano'),
        pianoКeys = document.querySelectorAll('.piano-key');
        
  function playAudio (src) {
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play();
  }

  /* MOUSE EVENT ============================================================ */

  const startSound = e => {
    if ( e.target.classList.contains('piano-key') ) {
      e.target.classList.add('active');
      playAudio(`assets/audio/${ e.target.dataset.note }.mp3`);
    }
  }

  const deactiveKey = e => {
    if ( e.target.classList.contains('piano-key') ) {
      e.target.classList.remove('active');
    }
  }

  const startCorrespondOver = e => {
    startSound(e);

    pianoКeys.forEach(el => {
      el.addEventListener('mouseover', startSound);
      el.addEventListener('mouseout', deactiveKey);
    });
  }

  const stopCorrespondOver = e => {
    deactiveKey(e);

    pianoКeys.forEach(el => {
      el.removeEventListener('mouseover', startSound);
      el.removeEventListener('mouseout', deactiveKey);
    });
  }

  piano.addEventListener('mousedown', startCorrespondOver);
  piano.addEventListener('mouseup', stopCorrespondOver);

  /* KEYBOARD EVENT ============================================================ */

  function activeKey (key) {
    pianoКeys.forEach(el => {
      if ( el.classList.contains('active') ) {
        el.classList.remove('active');
      }
    });

    key.classList.add('active');
  };

  let letters = {};

  pianoКeys.forEach(key => {
    if ( key.dataset.letter ) {
      letters[key.dataset.letter] = {
        note: key.dataset.note,
        key
      };
    }
  });

  window.addEventListener('keydown', e => {
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      activeKey(letters[code].key);
      playAudio(`assets/audio/${ letters[code].note }.mp3`);
    }
  });
}());
