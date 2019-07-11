/* eslint-disable prettier/prettier */

const doorImage1  = document.getElementById('door1')
const doorImage2  = document.getElementById('door2')
const doorImage3  = document.getElementById('door3')
const startButton = document.getElementById('start')
const current     = document.getElementById('current-streak')
const best        = document.getElementById('best-streak')

/* urls for door pics */
const botDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg'

const beachDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg'

const spaceDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg'

const closedDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'

/* running variables */
let openDoor1 = ''
let openDoor2 = ''
let openDoor3 = ''
let currentCount = 0
let bestCount = 0
let numClosedDoors = 3
let currentlyPlaying = true

/* logic for door encounters */
const isClicked = door => door.src !== closedDoorPath
const isBot = door => door.src === botDoorPath

/* toggle playing status */
const gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?'
    currentCount += 1
  } else {
    startButton.innerHTML = 'Game Over! Try again?'
    currentCount = 0
  }

  current.innerHTML = currentCount
  currentlyPlaying = false

  // update best streak */
  if (currentCount > bestCount) {
    bestCount = currentCount
    best.innerHTML = bestCount
  }
}

const playDoor = door => {
  numClosedDoors--
  if (numClosedDoors === 0) gameOver('win')
  else if (isBot(door)) gameOver()
}

/* gen # between 1 and 3 */
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors)
  if (choreDoor === 1) {
    openDoor1 = botDoorPath
    openDoor2 = beachDoorPath
    openDoor3 = spaceDoorPath
  } else if (choreDoor === 2) {
    openDoor1 = beachDoorPath
    openDoor2 = botDoorPath
    openDoor3 = spaceDoorPath
  } else {
    openDoor1 = spaceDoorPath
    openDoor2 = beachDoorPath
    openDoor3 = botDoorPath
  }
}

/* reset starting values */
const startRound = () => {
  doorImage1.src        = closedDoorPath
  doorImage2.src        = closedDoorPath
  doorImage3.src        = closedDoorPath
  numClosedDoors        = 3
  currentlyPlaying      = true
  startButton.innerHTML = 'Good luck!'
  randomChoreDoorGenerator()
}

const initializeCounters = () => {
  current.innerHTML = currentCount
  best.innerHTML = bestCount
}

/* onload settings to start values */
startRound()
initializeCounters()

/* listeners */
doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1
    playDoor(doorImage1)
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2
    playDoor(doorImage2)
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3
    playDoor(doorImage3)
  }
}

startButton.onclick = () => (!currentlyPlaying ? startRound() : null)
