function generateRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class MouseOver{
    constructor(color, totalBalls, maxWidth, classes,speed) {
        this.body = document.querySelector('.container')
        this.color=color
        this.totalBalls = totalBalls
        this.maxWidth = maxWidth
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d'),
        this.balls =[]
        this.classes = classes
        this.colors = ['red', 'green', 'black', 'blue', 'grey', 'yellow', 'brown', 'orange', 'purple']
        this.movingDir = ['+4', '-4']
        this.maxSpeedPos = 3
        this.maxSpeedNeg = -3
        this.gameStarted=false
    }
    handleCanvasLook = () => {
        this.body.appendChild(this.canvas)
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.backgroundColor = this.color || 'white'
        this.canvas.classList.add(...this.classes)
        this.interval = null
    }
    handleCreateBallsData = () => {
        for (let i = 0; i < this.totalBalls; i++){
            const ballPropsObj = {
                x: Math.round(generateRandomNum(10, this.canvas.width)),
                y: Math.round(generateRandomNum(10, this.canvas.height)),
                radius: Math.round(generateRandomNum(10,this.maxWidth)),
                startAngle: 0,
                endAngle: 2 * Math.PI,
                color: this.colors[generateRandomNum(0, this.colors.length-1)],
                mainSpeedX: Number(this.movingDir[generateRandomNum(0, 1)]),
                mainSpeedY: Number(this.movingDir[generateRandomNum(0, 1)]),
                id:i
            }
            ballPropsObj.startRadius = ballPropsObj?.radius
            this.balls.push(ballPropsObj)
        }
    }

    createBalls = () => {
        this.balls.forEach(ball => {
            const { x, y, radius, startAngle, endAngle,color,domElem } = ball
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, startAngle, endAngle)
            this.ctx.closePath()
            this.ctx.fill()
           
        })
    }
    handleMoveBall = () => {
        this.balls.forEach(ball => {
            ball.x += ball.mainSpeedX
            ball.y += ball.mainSpeedY
            if (ball.x + ball.radius > this.canvas.width) {
                ball.mainSpeedX = this.maxSpeedNeg
            }
            if (ball.x - ball.radius < 5) {
                ball.mainSpeedX = this.maxSpeedPos
            }

            if (ball.y - ball.radius < 0) {
                ball.mainSpeedY = this.maxSpeedPos
            }
            if (ball.y + ball.radius > this.canvas.height) {
                ball.mainSpeedY = this.maxSpeedNeg
            }

        })
    }
    runMouseOver = () => {
        if (!this.gameStarted) {
            this.handleCanvasLook()
            this.handleCreateBallsData()
            document.addEventListener('mousemove', (e) => {
                this.balls.forEach(ball => {
                    const isX = e.clientX > ball.x - ball.radius && e.clientX < ball.x + ball.radius
                    const isY = e.clientY > ball.y - ball.radius && e.clientY < ball.y + ball.radius
                    if (isX && isY) {
                        ball.radius += 3
                    } else {
                        ball.radius = ball.startRadius
                    }
                })
            })
            this.gameStarted = true
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleMoveBall()
        this.createBalls()
        this.interval = requestAnimationFrame(this.runMouseOver)
    }
}

const mouseover = new MouseOver('',20, 35, '','mid')
mouseover.runMouseOver()

