document.addEventListener('DOMContentLoaded', () => {
    const words = [
        "legal", "chaos", "dress", "pizza", "daily", "country", "concile", "public", "protect", "aspect", "accept",
        "except", "laugh", "together", "youth", "never", "neither", "either", "forehead", "occasion", "forms",
        "forums", "makeup", "another", "matter", "necessary", "along", "beautiful", "gorgeous", "good", "at",
        "the", "angry", "happy", "joy", "cheers", "done", "free", "doctor", "little", "bit", "take", "whose",
        "interest", "balloon", "it", "of", "is", "in", "too", "tool", "or", "for", "council", "alone", "loud",
        "boy", "girl", "friend", "story", "lover", "crime", "heart", "break", "shadow", "things", "moment",
        "memory", "like", "an", "dairy", "diary", "now", "win", "tin", "lit", "own", "are", "ear", "ate", "eat",
        "owe", "present", "current", "sat", "boring", "lewd", "mad", "bad", "clean", "swap", "pause", "play",
        "planets", "world" 
    ];

    const colors = [
        'pink', 'lightblue', 'lightgreen', 'yellow', 'coral', 'violet',
        'lightcoral', 'lightgoldenrodyellow', 'lightseagreen', 'lightsalmon'
    ];

    const gameContainer = document.getElementById('game-container');
    const boundary = document.getElementById('boundary');
    const pin = document.getElementById('pin');
    let typedWord = '';
    let gameOver = false;

    function createBalloon() {
        if (gameOver) return;

        const word = words[Math.floor(Math.random() * words.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = color;
        balloon.style.left = `${Math.random() * (gameContainer.clientWidth - 80)}px`;
        balloon.style.animationDuration = `${Math.random() * 5 + 5}s`;

        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = word;
        balloon.appendChild(wordDiv);

        gameContainer.appendChild(balloon);
    }

    function createPin(balloon) {
        const pin = document.createElement('div');
        pin.classList.add('pin');
        boundary.appendChild(pin); 
        pin.style.left = `${balloon.offsetLeft + balloon.clientWidth / 2 - pin.clientWidth / 2}px`;
        pin.style.bottom = `${window.innerHeight - balloon.getBoundingClientRect().top}px`;

        pin.style.animation = 'rise 0.3s linear forwards';

        // Remove the pin and burst the balloon immediately after animation ends
        pin.addEventListener('animationend', () => {
            balloon.classList.add('burst');
            pin.remove();
            setTimeout(() => balloon.remove(), 150); // Ensure balloon is removed right after burst
        });
    }

    function checkWord(event) {
        const pressedKey = event.key.toLowerCase(); // The current key pressed
        let matchFound = false; // Track if a match is found for a balloon

        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            if (matchFound) return; // If a match is found, stop processing other balloons

            const wordDiv = balloon.querySelector('.word');
            const word = wordDiv.textContent;

            if (word.startsWith(pressedKey)) {
                wordDiv.textContent = word.slice(1); // Remove the first letter from the word

                if (wordDiv.textContent === '') {
                    // Check if the balloon is in the right position to be hit by the pin
                    if (balloon.getBoundingClientRect().bottom >= pin.getBoundingClientRect().top) {
                        createPin(balloon);
                    }
                    balloon.remove(); // Remove the balloon after it bursts
                }

                matchFound = true; // Stop checking other balloons once a match is found
            }
        });
    }

    function checkBoundaryCollision() {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            if (balloon.getBoundingClientRect().bottom >= boundary.getBoundingClientRect().top) {
                endGame(); // Game over if the balloon touches the boundary
            }
        });
    }

    function endGame() {
        gameOver = true;
        alert('Game Over!'); // You can replace this with a more elaborate game-over screen
        clearInterval(balloonCreationInterval);
        clearInterval(boundaryCheckInterval);
        // Add any other game-over logic here, such as stopping balloon creation, etc.
    }

    const balloonCreationInterval = setInterval(createBalloon, 2000);
    const boundaryCheckInterval = setInterval(checkBoundaryCollision, 50);
    document.addEventListener('keypress', checkWord);
});
