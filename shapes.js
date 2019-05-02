//two things matter needs
//first thing is an engine - computation and math behind it
//second thing is a renderer - this draws the engine

// alias is a shortcut to make code clean
const Engine = Matter.Engine
const Render = Matter.Render
const Bodies = Matter.Bodies
const World = Matter.World
const MouseConstraint = Matter.MouseConstraint
const Composites = Matter.Composites

// const {Engine, Render} = Matter

//where is matter being deployed
const sectionTag = document.querySelector("section.shapes")

//height & width of window
const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        height: h,
        width: w,
        background: "#000000",
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
})

//create ability to make shape
function createShape(x, y) {
    return Bodies.circle(x, y, 20, {
        render: {
            fillStyle: "white",
            // sprite: {
            //     texture: "assets/outline-2x.png",
            //     xScale: 0.5,
            //     yScale: 0.5
            //   }
        }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w/4, h/4), {
    isStatic: true,
    render: {
        fillStyle: "white"
    }
})

const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100 , 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100 , 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100 , h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100 , h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})

const initialShapes = Composites.stack(50, 50, 100, 2, 15, 15, function(x, y) {
    return createShape(x, y)
})


World.add(engine.world,[
    bigBall, 
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initialShapes,
])

//on click add shape
document.addEventListener("click", function(e) {
    const x = e.pageX
    const y = e.pageY
    const shape = createShape(x, y)
    World.add(engine.world, shape)
})










//run both engine & renderer
Engine.run(engine)
Render.run(renderer)


//change gravity
// let time = 0
// function changeGravity() {
//     time = time + 0.008

//     engine.world.gravity.x = Math.sin(time)
//     engine.world.gravity.y = Math.cos(time)
    
//     requestAnimationFrame(changeGravity)
// }

// changeGravity()


// device orientation
window.addEventListener("deviceorientation", function(e) {
    engine.world.gravity.x = e.gamma / 30
    engine.world.gravity.y = e.beta / 30
})