let points = 0;
let bugdroidCount = 0;
let roundNumber = 0;
let startTime;
let timerInterval;
let challengeActive = false;
let challengeTime = 60;
let challengeTimerInterval;
let customLevels = [];
let levelEditorOpen = false;
let storyModeOpen = false;

const backgrounds = ['assets/mcdonalds.jpg', 'assets/livingroom.png', 'assets/kitchen.avif'];

function setGame() {
    document.getElementById('gameContainer').style.backgroundImage = `url(${backgrounds[roundNumber % backgrounds.length]})`;

    // Clear previous droids
    document.querySelectorAll('.droid').forEach(droid => droid.remove());

    // Create new droids
    for (let i = 0; i < bugdroidCount; i++) {
        const droid = document.createElement('img');
        droid.src = 'assets/bugdroid-head.png';
        droid.className = 'droid bugdroid';
        droid.style.left = `${Math.random() * 90}%`;
        droid.style.top = `${Math.random() * 90}%`;
        droid.style.width = '50px';
        droid.style.height = '50px';
        droid.addEventListener('click', () => handleDroidClick(droid));
        document.getElementById('gameContainer').appendChild(droid);
    }

    for (let i = 0; i < bugdroidCount * 10; i++) {
        const droid = document.createElement('img');
        droid.src = 'assets/Kitdroid.png';
        droid.className = 'droid kitdroid';
        droid.style.left = `${Math.random() * 90}%`;
        droid.style.top = `${Math.random() * 90}%`;
        droid.style.width = '30px';
        droid.style.height = '30px';
        droid.addEventListener('click', () => handleDroidClick(droid));
        document.getElementById('gameContainer').appendChild(droid);
    }

    startRound();
}

function handleDroidClick(droid) {
    if (droid.src.includes('bugdroid')) {
        points += 10;
        bugdroidCount--;
        droid.remove();
        if (bugdroidCount <= 0) {
            endRound();
        } else {
            alert(`Found 1! ${bugdroidCount} more left!`);
        }
    } else {
        points -= 5;
        droid.remove();
    }
    document.getElementById('points').innerText = `Points: ${points}`;
}

function startRound() {
    bugdroidCount = 3 + roundNumber * 2;
    setGame();

    if (challengeActive) {
        startChallenge();
    }

    startTime = Date.now();
    timerInterval = setInterval(() => {
        let timeLeft = Math.max(0, Math.floor((60 * 1000 - (Date.now() - startTime)) / 1000));
        document.getElementById('timeLeft').innerText = `Time Left: ${timeLeft}`;
        if (timeLeft === 0) {
            endRound();
        }
    }, 1000);

    roundNumber++;
    document.getElementById('roundsPlayed').innerText = `Rounds Played: ${roundNumber}`;
}

function endRound() {
    clearInterval(timerInterval);
    alert(`Round Over! Your score: ${points}`);
    document.getElementById('challengeTimer').innerText = `Challenge Time: 0`;
    setTimeout(startRound, 2000);
}

function startChallenge() {
    challengeActive = true;
    let challengeEndTime = Date.now() + (challengeTime * 1000);
    challengeTimerInterval = setInterval(() => {
        let timeLeft = Math.max(0, Math.floor((challengeEndTime - Date.now()) / 1000));
        document.getElementById('challengeTimer').innerText = `Challenge Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(challengeTimerInterval);
            alert('Challenge Over!');
            challengeActive = false;
        }
    }, 1000);
}

document.getElementById('shopButton').addEventListener('click', () => document.getElementById('shop').style.display = 'flex');
document.getElementById('levelEditorButton').addEventListener('click', () => {
    levelEditorOpen = !levelEditorOpen;
    document.getElementById('levelEditor').style.display = levelEditorOpen ? 'flex' : 'none';
});
document.getElementById('timedChallengeButton').addEventListener('click', () => {
    challengeActive = !challengeActive;
    if (challengeActive) {
        startChallenge();
    } else {
        clearInterval(challengeTimerInterval);
        document.getElementById('challengeTimer').innerText = `Challenge Time: 0`;
    }
});
document.getElementById('infoButton').addEventListener('click', () => alert('The best Android version is subjective!'));
document.getElementById('helpButton').addEventListener('click', () => alert('Try to find all the Bugdroids as fast as possible!'));

document.getElementById('closeShop').addEventListener('click', () => document.getElementById('shop').style.display = 'none');
document.getElementById('closeLevelEditor').addEventListener('click', () => document.getElementById('levelEditor').style.display = 'none');
document.getElementById('closeStoryMode').addEventListener('click', () => document.getElementById('storyMode').style.display = 'none');

document.getElementById('saveLevel').addEventListener('click', () => {
    // Implement saving level logic
});
document.getElementById('loadLevels').addEventListener('click', () => {
    // Implement loading levels logic
});
