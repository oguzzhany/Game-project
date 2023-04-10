window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
  
    const bgImg = new Image()
    bgImg.src = '../images/road.png'
  
    const carImg = new Image()
    carImg.src = '../images/yellowcar.png'

    const carImg2 = new Image()
    carImg2.src = '../images/whitecar.png'
  
    const carHeight = 90
    const carWidth = 110
    let carY = 360
  
    let isMovingUp = false
    let isMovingDown = false
    const carX = 100
  
    let gameOver = false
    let animateId
    let obstacles = []
  
    class Obstacle {
      constructor(x) {
        this.xPos = 1080
        this.yPos = x
        this.width = 110
        this.height = 90
      }
  
      move() {
        this.xPos -= 1
      }
  
      draw() {
        ctx.beginPath()
        ctx.fillStyle = 'teal'
        // xPos, yPos, width, height
        // ctx.rect(this.xPos, this.yPos, this.width, this.height)
        ctx.drawImage(carImg2, this.xPos, this.yPos, this.width, this.height)
        ctx.fill()
        ctx.closePath()
      }
  
      checkCollision() {
        if (
          carX < this.xPos + this.width &&
          carX + carWidth > this.xPos &&
          carY < this.yPos + this.height &&
          carHeight + carY > this.yPos
        ) {
          // Collision detected!
          // Game Over
          gameOver = true
          console.log('Collision')
        }
      }
    }
  
     


    const drawCar = () => {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // img,xPos, yPos, width, height
      ctx.drawImage(carImg, carX, carY, carWidth, carHeight)
      ctx.fill()
      ctx.closePath()
    }
  
    const animate = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  
      drawCar()
  
      const obstaclesStillInScreen = []
  
      console.log(obstacles)
      obstacles.forEach(obstacle => {
        obstacle.draw()
        obstacle.checkCollision()
        obstacle.move()
        // Is my obstacle still in the screen
        if (obstacle.xPos < canvas.width) {
          obstaclesStillInScreen.push(obstacle)
        }
      })
      obstacles = obstaclesStillInScreen
  
      if (animateId % 300 === 0) {
        obstacles.push(new Obstacle(Math.random() * (canvas.height - 200)))
      }
      
      if (carY > 720 - carHeight) carY = 720 - carHeight; 
      else if (carY < -carHeight+90) carY = -carHeight+90;

      if (isMovingUp) {
        carY -= 1
      } else if (isMovingDown) {
        carY += 1
      }
  
      if (gameOver) {
        cancelAnimationFrame(animateId)
        document.querySelector('#game-board').style.display = 'none'
        document.querySelector('.game-over').style.display = 'block'
      } else {
        animateId = requestAnimationFrame(animate)
      }
    }
  
    const startGame = () => {
      document.querySelector('.game-intro').style.display = 'none'
      document.querySelector('#game-board').style.display = 'block'
  
      animate()
    }

  
    document.getElementById('start-button').addEventListener('click', () => {
        startGame()
    })

    const tryAgain = () => {
        document.querySelector('.game-over').style.display = 'none'
        document.querySelector('#game-board').style.display = 'block'

        startGame()
    }

    document.getElementById('try-again-button').addEventListener('click', () => {
        tryAgain()
    })

  
    document.addEventListener('keydown', event => {
      console.log(event)
      if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        isMovingUp = true
      }
      if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        isMovingDown = true
      }
      console.log({ isMovingUp, isMovingDown })
    })
  
    document.addEventListener('keyup', event => {
      console.log(event)
      if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        isMovingUp = false
      }
      if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        isMovingDown = false
      }
      console.log({ isMovingUp, isMovingDown })
    })
  })