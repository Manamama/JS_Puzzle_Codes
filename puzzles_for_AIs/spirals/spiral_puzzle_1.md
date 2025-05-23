#Ver. 2.1
Goal : create a a clockwise red spiral, in a white matrix. Write a function print_spiral(n) that generates a square matrix of size n × n, where:

The matrix is filled with two emojis:

Red squares: 🟥

White squares: ⬜

The filling starts from the center of the matrix, placing 🟥 squares in an outward spiral, expanding one unit farther in each new direction (right → down → left → up, and repeat).

Each “arm” of the spiral is exactly one step longer than the previous.

Stop filling after a fixed number of red tiles. Leave all remaining positions in the matrix white (⬜).

After each completed spiral segment, print the intermediate matrix state.

Input:
n — an odd integer (e.g., 5, 7, 9) representing the matrix dimensions.

Output:
A sequence of printed matrices, showing the red spiral growing step-by-step.


E.g. for n=5, the target image should be: 
```

🟥🟥🟥🟥🟥
🟥⬜⬜⬜⬜
🟥⬜🟥🟥⬜
🟥⬜⬜🟥⬜
🟥🟥🟥🟥⬜
```

The code should start by placing a dot in the middle of the matrix and then show the progress of the spiral as this: 
```
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ 🟥 ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜

⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ 🟥 🟥 ⬜
⬜ ⬜ ⬜ 🟥 ⬜
⬜ ⬜ ⬜ ⬜ ⬜

⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ ⬜ ⬜ ⬜
⬜ ⬜ 🟥 🟥 ⬜
⬜ ⬜ ⬜ 🟥 ⬜
⬜ 🟥 🟥 🟥 ⬜

⬜ ⬜ ⬜ ⬜ ⬜
🟥 ⬜ ⬜ ⬜ ⬜
🟥 ⬜ 🟥 🟥 ⬜
🟥 ⬜ ⬜ 🟥 ⬜
🟥 🟥 🟥 🟥 ⬜

🟥 🟥 🟥 🟥 🟥
🟥 ⬜ ⬜ ⬜ ⬜
🟥 ⬜ 🟥 🟥 ⬜
🟥 ⬜ ⬜ 🟥 ⬜
🟥 🟥 🟥 🟥 ⬜

```
Notice the white spaces retained by that algorithm: half the resulting shape remains white: there is a red spiral and white spiral at the end. 


Now, you have the beginning of  code :

`def print_spiral(n):
    emoji_list = ["🟥", "⬜"]`
....

Task: create the code that does so. 
