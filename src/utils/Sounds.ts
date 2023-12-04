import { Howl } from "howler";

const sounds = {
  flip: new Howl({ src: ["src/assets/sounds/card-flip.wav"] }),
  match: new Howl({ src: ["src/assets/sounds/card-match.wav"] }),
  notMatch: new Howl({ src: ["src/assets/sounds/card-not-match.wav"] }),
  victory: new Howl({ src: ["src/assets/sounds/game-win.wav"] }),
};

const SoundsUtilities = {
  playFlip: (): void => {
    sounds.flip.play();
  },
  playMatch: (): void => {
    sounds.match.play();
  },
  playNotMatch: (): void => {
    sounds.notMatch.play();
  },
  playVictory: (): void => {
    sounds.victory.play();
  },
};

export default SoundsUtilities;
