(function () {
  const piano = document.querySelector('.piano'),
        pianoКeys = document.querySelectorAll('.piano-key');

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

  const activeKey = key => {
    pianoКeys.forEach(el => {
      if ( el.classList.contains('active') ) {
        el.classList.remove('active');
      }
    });

    key.classList.add('active');
  };

  window.addEventListener('keydown', e => {
    const code = e.code.replace('Key', '');

    if ( letters[code] ) {
      activeKey(letters[code].key);
      playAudio(`assets/audio/${ letters[code].note }.mp3`);
    }
  });

  /* VIEW NOTES/LETTERS ============================================================ */

  const btns = document.querySelector('.btn-container');

  btns.addEventListener('click', e => {
    if (e.target.classList.contains('btn-active')) return;

    e.target.classList.add('btn-active');

    if (e.target.classList.contains('btn-notes')) {
      e.target.nextElementSibling.classList.remove('btn-active');
      pianoКeys.forEach(el => el.classList.remove('piano-key-letter'));
    } else {
      e.target.previousElementSibling.classList.remove('btn-active');
      pianoКeys.forEach(el => el.classList.add('piano-key-letter'));
    }
  });
}());
