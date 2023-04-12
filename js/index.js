window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
  
    const bgImg = new Image()
    bgImg.src = '/images/road.png'

    const bgImg2 = new Image()
    bgImg2.src = '/images/forest.png'
  
    const carImg = new Image()
    carImg.src = '/images/yellowcar.png'

    const carImg2 = new Image()
    carImg2.src = '/images/whitecar.png'

    const teslaImg = new Image()
    teslaImg.src = '/images/tesla.png'

    const baguetteImg = new Image()
    baguetteImg.src = '/images/baguette.png'

    let joshImg = new Image()
    joshImg.src = '/images/joshson.png'

    const mKingImg = new Image()
    mKingImg.src = '/images/baguetteking.png'

    const matImg = new Image()
    matImg.src = '/images/baguettekingmat.png'

    const rockImg = new Image()
    rockImg.src = '/images/rock.png'

    const playBtn = document.getElementById('play-button');
    const startBtn = document.getElementById('start-button');
    const restartBtn = document.getElementById('restart-button');
    const fightBtn = document.getElementById('fight-button');
    const nextBtn = document.getElementById('next-button');
    const doomBtn = document.getElementById('doom-button');
    const menuBtn = document.getElementById('menu-button');
    
  
    const carHeight = 90
    const carWidth = 110
    let carY = 300
    let carX = 30
    let carSpeedX = 0.2

    const teslaHeight = 85
    const teslaWidth = 125
    let teslaY = 300
    let teslaX = 1150
    let teslaSpeedY = 1

    const joshHeight = 180
    const joshWidth = 100
    let joshY = 360
    let joshX = 40
    let joshHealth = 1

    const matHeight = 90
    const matWidth = 90
    let matY = 300
    let matX = 1150

    const mKingHeight = 275
    const mKingWidth = 235
    let mKingY = 300
    let mKingX = 1050
    let mKingHealth = 20
    let mKingSpeedY = 1


    let isMovingUp = false
    let isMovingDown = false
    let isShooting = false
  
    let gameOver = false
    let animateId
    let obstacles = []
    let baguettes = []
    let rocks = []
  
    class Obstacle {
      constructor(x) {
        this.xPos = 1050
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


    class Baguette {
        constructor(x) {
          this.xPos = 1080
          this.yPos = x
          this.width = 56
          this.height = 23
        }
    
        move() {
          this.xPos -= 1
        }
    
        draw() {
          ctx.beginPath()
          ctx.fillStyle = 'teal'
          // xPos, yPos, width, height
          // ctx.rect(this.xPos, this.yPos, this.width, this.height)
          ctx.drawImage(baguetteImg, this.xPos, this.yPos, this.width, this.height)
          ctx.fill()
          ctx.closePath()
        }
    
        checkCollision() {
          if (
            joshX < this.xPos + this.width &&
            joshX + joshWidth > this.xPos &&
            joshY < this.yPos + this.height &&
            joshHeight + joshY > this.yPos
          ) {
            // Collision detected!
            // Game Over
            this.xPos = -1000
            joshHealth -= 1
            
            // gameOver = true
            console.log('Collision')
            console.log(`${joshHealth}`);
          }
        }
      }
    
    class Rock {
        constructor(x) {
          this.xPos = joshX
          this.yPos = x
          this.width = 20
          this.height = 20
        }
    
        move() {
          this.xPos += 3
        }
    
        draw() {
          ctx.beginPath()
          ctx.fillStyle = 'teal'
          // xPos, yPos, width, height
          // ctx.rect(this.xPos, this.yPos, this.width, this.height)
          ctx.drawImage(rockImg, this.xPos, this.yPos, this.width, this.height)
          ctx.fill()
          ctx.closePath()
        }
    
        checkCollision() {
          if (
            mKingX+100 < this.xPos + this.width &&
            mKingX + mKingWidth + 100> this.xPos &&
            mKingY < this.yPos + this.height &&
            mKingHeight + mKingY > this.yPos
          ) {
            // Collision detected!
            // Game Over
            this.xPos = 3500
            mKingHealth -= 1
            // gameOver = true
            console.log('Collision')
            console.log(`${mKingHealth}`);
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

    const drawTesla = () => {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // img,xPos, yPos, width, height
      ctx.drawImage(teslaImg, teslaX, teslaY, teslaWidth, teslaHeight)
      ctx.fill()
      ctx.closePath()
    }

    const drawJosh = () => {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // img,xPos, yPos, width, height
      ctx.drawImage(joshImg, joshX, joshY, joshWidth, joshHeight)
      ctx.fill()
      ctx.closePath()
    }

    const drawMat = () => {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // img,xPos, yPos, width, height
      ctx.drawImage(matImg, matX, matY, matWidth, matHeight)
      ctx.fill()
      ctx.closePath()
    }

    const drawmKing = () => {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // img,xPos, yPos, width, height
      ctx.drawImage(mKingImg, mKingX, mKingY, mKingWidth, mKingHeight)
      ctx.fill()
      ctx.closePath()
    }

    const drawHp = () => {
      ctx.save()
      ctx.fillStyle = 'white';
      ctx.font = "30px Arial"
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowColor = 'black';
      ctx.fillText("Josh's Hp: " + joshHealth, 40, 50)
      ctx.fillText("Baguette King's Hp: " + mKingHealth, 900, 50)
      ctx.fontSize = 11;
      ctx.fill()
      ctx.restore()
    }
   
    
  
    const animate = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
      
  
      drawCar()
      drawTesla()
      
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
      
      let randomRoad = ''
      if (animateId % 350 === 0) {  
        min = Math.ceil(5);
        max = Math.floor(0);
        randomRoad= Math.floor(Math.random() * (max - min + 1) + min)}
      if (randomRoad === 1) {
        obstacles.push(new Obstacle(140))
      }else if(randomRoad === 2){
        obstacles.push(new Obstacle(260))
      }else if(randomRoad === 3){
        obstacles.push(new Obstacle(380))
      }else if(randomRoad === 4){
        obstacles.push(new Obstacle(490))
      }
        
          
        // obstacles.push(new Obstacle(Math.random() * (canvas.height - 200)))
    //   }
      
      // setInterval(function() {
      //   carX += 0.001; 
      // }, 150);

        carX += carSpeedX

      if (carY > 720 - carHeight) carY = 720 - carHeight; 
      else if (carY < -carHeight+90) carY = -carHeight+90;

      if(teslaY > 600 - teslaHeight) {
        teslaSpeedY *= -1
      }

      if(teslaY < 120) {
        teslaSpeedY *= -1
      }
      teslaY += teslaSpeedY

      if (isMovingUp) {
        carY -= 1.2
      } else if (isMovingDown) {
        carY += 1.2
      }

      
  
      if (gameOver) {
        cancelAnimationFrame(animateId)
        document.querySelector('#game-board').style.display = 'none'
        document.querySelector('.game-over').style.display = 'block'
      } else {
        animateId = requestAnimationFrame(animate)
      }

      if (carX >= 800) {
        cancelAnimationFrame(animateId)
        document.querySelector('#game-board').style.display = 'none'
        document.querySelector('.second-scene').style.display = 'block'
      }
    }

    const animate2 = () => {
        ctx.drawImage(bgImg2, 0, 0, canvas.width, canvas.height)

        drawJosh()
        drawmKing()
        drawHp()

        
        const baguettesStillInScreen = []
  
        console.log(baguettes)
        baguettes.forEach(baguette => {
          baguette.draw()
          baguette.checkCollision()
          baguette.move()
          // Is my obstacle still in the screen
          if (baguette.xPos < canvas.width) {
            baguettesStillInScreen.push(baguette)
          }
        })
        baguettes = baguettesStillInScreen
        
        if (animateId % 300 === 0) {  
          baguettes.push(new Baguette(mKingY+150))
        }

        const rocksStillInScreen = []
  
        console.log(rocks)
        rocks.forEach(rock => {
          rock.draw()
          rock.checkCollision()
          rock.move()
          // Is my obstacle still in the screen
          if (rock.xPos < canvas.width) {
            rocksStillInScreen.push(rock)
          }
        })
        rocks = rocksStillInScreen
        
        if (rocksStillInScreen.length <= 4 && isShooting) {  
          rocks.push(new Rock(joshY+100))
          isShooting = false;
        }



        // if (mKingHealth <= 10) {
        //   mKingImg.src = '../images/whitecar.png'
        //   animateId = false
        // }

        if (joshY > 720 - joshHeight) joshY = 720 - joshHeight; 
        else if (joshY < -joshHeight+90) joshY = -joshHeight+90;

        if(mKingY > 720 - mKingHeight) {
          mKingSpeedY *= -1
        }

        if(mKingY < 0) {
          mKingSpeedY *= -1
        }
        mKingY += mKingSpeedY

        if (isMovingUp) {
          joshY -= 1.2
        } else if (isMovingDown) {
          joshY += 1.2
        }


        // animateId = requestAnimationFrame(animate2)
        if (joshHealth <= 0) {
          gameOver
        }

        if (gameOver) {
          cancelAnimationFrame(animateId)
          document.querySelector('#game-board').style.display = 'none'
          document.querySelector('.game-over').style.display = 'block'
        } else {
          animateId = requestAnimationFrame(animate2)
        }

        if (mKingHealth <= 13) {
         
          cancelAnimationFrame(animateId)
          obstacles = []
          baguettes = []
          rocks = []
          document.querySelector('#game-board').style.display = 'none'
          document.querySelector('.third-scene').style.display = 'block'
        }
    }
  

    const animate3 = () => {
      ctx.drawImage(bgImg2, 0, 0, canvas.width, canvas.height)
      mKingImg.src = '/images/baguettekingmat.png'
      drawJosh()
      drawmKing()
      drawHp()

      
      const baguettesStillInScreen = []

      console.log(baguettes)
      baguettes.forEach(baguette => {
        baguette.draw()
        baguette.checkCollision()
        baguette.move()
        // Is my obstacle still in the screen
        if (baguette.xPos < canvas.width) {
          baguettesStillInScreen.push(baguette)
        }
      })
      baguettes = baguettesStillInScreen
      
      if (animateId % 180 === 0) {  
        baguettes.push(new Baguette(mKingY+150))
      }

      const rocksStillInScreen = []

      console.log(rocks)
      rocks.forEach(rock => {
        rock.draw()
        rock.checkCollision()
        rock.move()
        // Is my obstacle still in the screen
        if (rock.xPos < canvas.width) {
          rocksStillInScreen.push(rock)
        }
      })
      rocks = rocksStillInScreen
      
      if (rocksStillInScreen.length <= 4 && isShooting) {  
        rocks.push(new Rock(joshY+100))
        isShooting = false;
      }



      // if (mKingHealth <= 10) {
      //   mKingImg.src = '../images/whitecar.png'
      //   animateId = false
      // }

      if (joshY > 720 - joshHeight) joshY = 720 - joshHeight; 
      else if (joshY < -joshHeight+90) joshY = -joshHeight+90;

      if(mKingY > 720 - mKingHeight) {
        mKingSpeedY *= -1
      }

      if(mKingY < 0) {
        mKingSpeedY *= -1
      }
      mKingY += mKingSpeedY

      if (isMovingUp) {
        joshY -= 1.2
      } else if (isMovingDown) {
        joshY += 1.2
      }


      // animateId = requestAnimationFrame(animate2)
      // if (joshHealth <= 0) {
      //   gameOver
      // }

      // if(mKingHealth <= 0) {
      //   win
      // }

      if (joshHealth <= 0) {
        cancelAnimationFrame(animateId)
        document.querySelector('#game-board').style.display = 'none'
        document.querySelector('.game-over').style.display = 'block'
      } else {
        animateId = requestAnimationFrame(animate3)
      }

      if (mKingHealth <= 0) {
         
        cancelAnimationFrame(animateId)
        obstacles = []
        baguettes = []
        rocks = []
        document.querySelector('#game-board').style.display = 'none'
        document.querySelector('.final-scene').style.display = 'block'
      }

      
  }

    const startGame = () => {
      
      // document.querySelector('.first-scene').style.display = 'none'
      document.querySelector('#game-board').style.display = 'block'
      gameOver = false;
      obstacles = []
      baguettes = []
      rocks = []
      carY = 360
      carX = 30
      joshHealth = 10
      mKingHealth = 20
      mKingImg.src = '/images/baguetteking.png'
  
      animate()
    }

    // const secondScene = () => {

    //   document.querySelector('.second-scene').style.display = 'none'
    //   document.querySelector('#game-board').style.display = 'block'
  
    //   animate2()
    // }

    // const thirdScene = () => {

    //   document.querySelector('.third-scene').style.display = 'none'
    //   document.querySelector('#game-board').style.display = 'block'
  
    // }

    // const fourthScene = () => {

    //   document.querySelector('.fourth-scene').style.display = 'none'
    //   document.querySelector('#game-board').style.display = 'block'
  
    //   animate3()
    // }


  
    playBtn.addEventListener('click', () => {
      document.querySelector('.game-intro').style.display = 'none'
      document.querySelector('.first-scene').style.display = 'block'
      
    })

    startBtn.addEventListener('click', () => {
      document.querySelector('.first-scene').style.display = 'none'
      startGame()
    })

    fightBtn.addEventListener('click', () => {
      document.querySelector('.second-scene').style.display = 'none'
      document.querySelector('#game-board').style.display = 'block'
      animate2()
    })

    nextBtn.addEventListener('click', () => {
      document.querySelector('.third-scene').style.display = 'none'
      document.querySelector('.fourth-scene').style.display = 'block'
    })

    doomBtn.addEventListener('click', () => {
      document.querySelector('.fourth-scene').style.display = 'none'
      document.querySelector('#game-board').style.display = 'block'
      animate3()
    })

    menuBtn.addEventListener('click', () => {
      document.querySelector('.final-scene').style.display = 'none'
      document.querySelector('.game-intro').style.display = 'block'
    })



    restartBtn.addEventListener('click', () => {
        document.querySelector('.game-over').style.display = 'none'
        gameOver = false;
        obstacles = []
        baguettes = []
        rocks = []
        carY = 360
        carX = 30
        joshHealth = 10
        mKingHealth = 20
        mKingImg.src = '/images/baguetteking.png'
        startGame()
    })

  
    document.addEventListener('keydown', event => {
      console.log(event)
      if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        isMovingUp = true
      }
      if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        isMovingDown = true
      }
      if (event.key === ' '){
        isShooting = true
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
      if (event.key === ' '){
        isShooting = false
      }
      console.log({ isMovingUp, isMovingDown })
    })
  })

