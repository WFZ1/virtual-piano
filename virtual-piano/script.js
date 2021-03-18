(function () {
  const piano = document.querySelector('.piano'),
        pianoКeys = piano.querySelectorAll('.piano-key');

  let letters = {};

  pianoКeys.forEach(key => {
    if ( key.dataset.letter ) {
      letters[key.dataset.letter] = {
        note: key.dataset.note,
        key
      };
    }
  });

  const playAudio = src => {
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

  window.addEventListener('keydown', e => {
    if (e.repeat) return; // disable autorepeat the keydowned key
    
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      letters[code].key.classList.add('active');
      playAudio(`assets/audio/${ letters[code].note }.mp3`);
    }
  });

  window.addEventListener('keyup', e => {
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      letters[code].key.classList.remove('active');
    }
  });

  /* VIEW NOTES/LETTERS ============================================================ */

  const btns = document.querySelector('.btn-container');

  btns.addEventListener('click', e => {
    if (e.target.classList.contains('active')) return;

    e.target.classList.add('active');

    if (e.target.classList.contains('btn-notes')) {
      e.target.nextElementSibling.classList.remove('active');
      pianoКeys.forEach(el => el.classList.remove('letter'));
    } else {
      e.target.previousElementSibling.classList.remove('active');
      pianoКeys.forEach(el => el.classList.add('letter'));
    }
  });

  /* FULLSCREEN ============================================================ */

  const fullscreen = document.querySelector('.fullscreen');

  fullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}());
