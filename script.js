let startTime, elapsedTime = 0, intervalId;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function timeToString(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const secs = totalSeconds % 60;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const hrs = Math.floor(totalSeconds / 3600);

  return (
    `${hrs.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(3, '0')}`
  );
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = timeToString(elapsedTime);
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    running = true;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(intervalId);
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(intervalId);
  running = false;
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = '';
};

lapBtn.onclick = () => {
  if (running) {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.prepend(li);
  }
};
