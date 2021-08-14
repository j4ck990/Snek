let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
const instr = document.getElementById("instructions1")

window.addEventListener('keydown', e => {
  
  switch (e.key) {
    case 'w':
      instr.style.display = "none"
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 's':
      instr.style.display = "none"
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'a':
      instr.style.display = "none"
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'd':
      instr.style.display = "none"
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}