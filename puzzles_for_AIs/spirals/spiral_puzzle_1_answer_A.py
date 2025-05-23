def print_spiral(n):
    emoji_list = ["🟥", "⬜"]
    matrix = [["⬜" for _ in range(n)] for _ in range(n)]
    count = 0
    x, y = n // 2, n // 2  # Starting point at the center
    step = 1
    direction = 0

    while count < n*n/2+1 :
        for _ in range(step):
            matrix[y][x] = emoji_list[0]  # Assign red element to matrix
            count += 1

            if direction == 0:
                x += 1  # Move right
            elif direction == 1:
                y += 1  # Move down
            elif direction == 2:
                x -= 1  # Move left
            else:
                y -= 1  # Move up
        direction = (direction + 1) % 4  # Update direction
        if direction % 1 == 0:  # Increment step if moving right or left
            print_matrix(matrix)  # Print intermediate result
            step += 1

def print_matrix(matrix):
    for row in matrix:
        print(" ".join(row))
    print()

print_spiral(5)
