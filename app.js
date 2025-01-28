document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");

    let playerOne = true;

    const winProbability = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerText !== "") return;  // Prevents overwriting

            // Mark the box with 'X' or 'O'
            if (playerOne) {
                box.innerText = "X";  // Player One is 'X'
                playerOne = false;  // Switch to Player Two
            } else {
                box.innerText = "O";  // Player Two is 'O'
                playerOne = true;  // Switch back to Player One
            }

            // Check if there's a winner after the move
            if (checkWinner()) {
                msg.textContent = `${box.innerText} wins!`;
                msgContainer.classList.remove("hide");
                return;
            }

            // Check if it's a draw
            if (isDraw()) {
                msg.textContent = "It's a draw!";
                msgContainer.classList.remove("hide");
                return;
            }
        });
    });

    function checkWinner() {
        for (let pattern of winProbability) {
            let [a, b, c] = pattern;
            if (boxes[a].innerText !== "" && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
                return true;
            }
        }
        return false;
    }

    function isDraw() {
        // Check if all boxes are filled and there is no winner
        return [...boxes].every(box => box.innerText !== "") && !checkWinner();
    }

    resetBtn.addEventListener("click", resetGame);

    function resetGame() {
        // Reset the game board
        boxes.forEach((box) => {
            box.innerText = "";
        });

        // Hide the winner message and show the game board again
        msgContainer.classList.add("hide");
        playerOne = true;  // Player One starts the new game
    }
});
