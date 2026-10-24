// Source art for the greyscale pixel devices, from sprites.md. One character is one pixel:
//   #  outline and dark detail (--grey-dark)
//   o  body (--grey-mid)
//   +  light panels (--grey-light)
//   s  screen pixels, rendered as their own .screen path so they can wake (see devices.ts)
//   t  text pixels on a screen: the screen's colour while off or waking, dark when awake
//   l  the LED, one pixel on the body, lit tangerine only while the screen is awake
//   .  transparent
// Every device has one screen region with at least two short rows of text, and one LED.
// The camera, instant camera and CD player have no screen, so their lens or disc centre is
// marked as the screen instead, with a pixel or two of text as a reflection.
// The art is original: don't swap in real product images.

export const deviceNames = [
  'phone', 'pager', 'player', 'camera', 'tape', 'calc',
  'watch', 'walkie', 'radio', 'cd', 'instant', 'flip',
] as const;

export type DeviceName = (typeof deviceNames)[number];

export const sprites: Record<DeviceName, string> = {
  phone: `
....##..........
....##..........
....##..........
..############..
.#oooooooooooo#.
.#o##########o#.
.#o#ssssssss#o#.
.#o#stttttts#o#.
.#o#ssssssss#o#.
.#o#sttttsss#o#.
.#o#ssssssss#o#.
.#o##########o#.
.#oooooooooolo#.
.#oo##oooo##oo#.
.#oooooooooooo#.
.#o##o##o##o#o#.
.#oooooooooooo#.
.#o##o##o##o#o#.
.#oooooooooooo#.
.#o##o##o##o#o#.
.#oooooooooooo#.
.#o##o##o##o#o#.
.#oooooooooooo#.
..############..`,

  pager: `
......................
.##################...
.#oooooooooooooooo#...
.#o##############o##..
.#o#ssssssssssss#o#o#.
.#o#stttttstttts#o#o#.
.#o#ssssssssssss#o#o#.
.#o#stttstttttts#o#o#.
.#o#ssssssssssss#o#o#.
.#o##############o##..
.#oooooooooooooloo#...
.#oo###oo###oo###o#...
.#oooooooooooooooo#...
.##################...`,

  player: `
.##############.
#++++++++++++++#
#+############+#
#+#ssssssssss#+#
#+#sttttttsss#+#
#+#ssssssssss#+#
#+#stttttttts#+#
#+#ssssssssss#+#
#+############+#
#+++++++++++l++#
#++++######++++#
#+++#oooooo#+++#
#++#oo####oo#++#
#+#oo#++++#oo#+#
#+#oo#++++#oo#+#
#+#oo#++++#oo#+#
#++#oo####oo#++#
#+++#oooooo#+++#
#++++######++++#
#++++++++++++++#
.##############.`,

  camera: `
....................
.....####.....###...
.....#oo#.....#l#...
.##################.
#oooooooooooooooooo#
#oo####oooooo###oo##
#oo#++#ooooooo#+#oo#
#oo####oo#####oooo##
#oooooo##ooooo##ooo#
#ooooo#o##tss##o#oo#
#oooo#o#t#####s#o#o#
#oooo#o#s#ooo#s#o#o#
#oooo#o#s#ooo#s#o#o#
#oooo#o#s#####s#o#o#
#ooooo#o##sss##o#oo#
#oooooo##ooooo##ooo#
#oooooooo#####ooooo#
#oooooooooooooooooo#
.##################.`,

  tape: `
.......................
.#####################.
#ooooooooooooooooooooo#
#o###################o#
#o#sssssssssssssssss#o#
#o#s###sstttttss###s#o#
#o#s#o#s#########o#s#o#
#o#s###ssttttsss###s#o#
#o#sssssssssssssssss#o#
#o###################o#
#ooooooooooooooooooooo#
#o##o##o##o##ooooooolo#
#ooooooooooooooooooooo#
.#####################.`,

  calc: `
.############.
#oooooooooool#
#o##########o#
#o#ssssssss#o#
#o#ssststst#o#
#o#ssststst#o#
#o#ssssssss#o#
#o##########o#
#oooooooooooo#
#o++o++o++##o#
#oooooooooooo#
#o++o++o++##o#
#oooooooooooo#
#o++o++o++##o#
#oooooooooooo#
#o++o++o++##o#
#oooooooooooo#
.############.`,

  watch: `
...######...
...#oooo#...
...#oooo#...
.##########.
#oooooooooo#
#o########o#
#o#ssssss#o#
#o#sttsts#o#
#o#stssts#o#
#o#sttsts#o#
#o#ssssss#o#
#o########o#
#oooooooool#
.##########.
...#oooo#...
...#oooo#...
...######...`,

  walkie: `
.##.........
.##.........
.##.........
.##.........
.##########.
#oolooooooo#
#o#o#o#o#oo#
#oooooooooo#
#o#o#o#o#oo#
#oooooooooo#
#o########o#
#o#ssssss#o#
#o#stttts#o#
#o#ssssss#o#
#o#sttsss#o#
#o#ssssss#o#
#o########o#
#oooooooooo#
#oo##oo##oo#
#oooooooooo#
#oo##oo##oo#
#oooooooooo#
.##########.`,

  radio: `
....................#...
...................#....
..................#.....
.######################.
#oooooooooooooooooooooo#
#o#o#o#o#o#o#oo######oo#
#oooooooooooooo#ssss#oo#
#o#o#o#o#o#o#oo#stts#oo#
#oooooooooooool#ssss#oo#
#o#o#o#o#o#o#oo#stss#oo#
#oooooooooooooo#ssss#oo#
#o#o#o#o#o#o#oo######oo#
#oooooooooooooooooooooo#
#oo##oooooooooooooo##oo#
#oooooooooooooooooooooo#
.######################.`,

  cd: `
.################.
#++++++++++++++++#
#+++++######+++++#
#+++##oooooo##+++#
#++#oooooooooo#++#
#+#oooo####oooo#+#
#+#ooo#tsss#ooo#+#
#+#ooo#t##s#ooo#+#
#+#ooo#ssss#ooo#+#
#+#oooo####oooo#+#
#++#oooooooooo#++#
#+++##oooooo##+++#
#+++++######+++++#
#++++++++++++++++#
#+##+##+l+++####+#
#++++++++++++++++#
.################.`,

  instant: `
.##################.
#++++++++++++++++++#
#+####++++++++###++#
#+#oo#++++++++#l#++#
#+####++####++###++#
#++++++##oooo##++++#
#+++++#oo####oo#+++#
#++++#oo#tsss#oo#++#
#++++#o#t#oo#s#o#++#
#++++#o#s#oo#s#o#++#
#++++#oo#ssss#oo#++#
#+++++#oo####oo#+++#
#++++++##oooo##++++#
#++++++++++++++++++#
####################
#oooooooooooooooooo#
#oo##############oo#
.##################.`,

  flip: `
.##########.
#oooooooooo#
#o########o#
#o#ssssss#o#
#o#stttts#o#
#o#ssssss#o#
#o#sttsss#o#
#o#ssssss#o#
#o########o#
#oooooooool#
.##########.
..########..
.#oooooooo#.
.#o##oo##o#.
.#oooooooo#.
.#o#o#o#oo#.
.#oooooooo#.
.#o#o#o#oo#.
.#oooooooo#.
.#o#o#o#oo#.
.#oooooooo#.
..########..`,
};

export interface SpritePaths {
  width: number;
  height: number;
  dark: string;
  body: string;
  light: string;
  screen: string;
  text: string;
  led: string;
}

const KEYS = { '#': 'dark', o: 'body', '+': 'light', s: 'screen', t: 'text', l: 'led' } as const;

/** Parse ASCII art into one path per colour, merging same-colour runs in a row into one rect. */
export function spritePaths(name: DeviceName): SpritePaths {
  const rows = sprites[name].replace(/^\n/, '').split('\n');
  const out: SpritePaths = {
    width: Math.max(...rows.map((r) => r.length)),
    height: rows.length,
    dark: '', body: '', light: '', screen: '', text: '', led: '',
  };
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x] as keyof typeof KEYS;
      let end = x + 1;
      while (end < row.length && row[end] === row[x]) end++;
      const key = KEYS[ch];
      if (key) out[key] += `M${x} ${y}h${end - x}v1h-${end - x}z`;
      x = end;
    }
  });
  return out;
}
