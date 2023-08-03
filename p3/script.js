class World {
    constructor(stage){
        this.stage = stage;
        this.objects = [];

        this.mouseX = 0;
        this.mouseY = 0;
        this.isPaused = false;

    }
    
    
    step(dt){
     
        if(this.isPaused){
            return;
        }   
        if(world.player.hitPoints <= 0){
            alert('Game over' + " - " + world.player.score);
            world.isPaused = true;
            document.location.reload();
        } 
        for(let i=0; i<this.objects.length; i++){
            let obj = this.objects[i];
            obj.step(dt);
            obj.makeDecision();
            obj.CheckCollision();
        }
        for(let i=this.objects.length-1; i>=0; i--){
            let obj = this.objects[i];
            if(obj.isDead){
                this.stage.removeChild(obj);
                this.objects.splice(i,1);
            }
        }
    }

    createMovingObject(x,y,c,v){
        let movingObject = new MovingObject(x,y,c,v);
        this.stage.addChild(movingObject);
        this.objects.push(movingObject);
    }
    createPlayerObject(x,y){
        this.player = this.createObjectOfClass(Player,x,y);
    }
    createEnemyObject(x,y){
        this.createObjectOfClass(Enemy,x,y);
    }
    createSpawnerObject(x,y){
        this.createObjectOfClass(Spawner,x,y);
    }
    createObjectOfClass(className,x,y){
        let obj = new className(x,y);
        obj.x = x;
        obj.y = y;
        this.stage.addChild(obj);
        this.objects.push(obj);
        return obj;
    }
    handleMove(e){
        this.mouseX = e.global.x;
        this.mouseY = e.global.y;
    }
    handlekeyDown(e){
        if(e.code == 'KeyB' ){
            world.isPaused = !world.isPaused;  
        }
    }
    listEnemiesAround(obj,rad){
        let res =[]
        for(let i = 0 ; i<this.objects.length;i++){
            let obj1 = this.objects[i]
            if(obj1 != obj){
                if(obj1 instanceof Enemy){
                    let dx = obj1.x-obj.x;
                    let dy = obj1.y-obj.y;
                    if(dx*dx+dy*dy<=rad*rad){
                        res.push(obj1);
                    }
                }
            }
        }
        return res;
    }
}
class MovingObject extends PIXI.Container{
  
    constructor(x, y, c, v){
        super();
        this.isDead = false
        this.x = x;
        this.y = y;
        this.course = c;
        this.speed = v;
        this.turnSpeed = 0.1;
        this.TargetCourse = this.course;

        this.image = PIXI.Sprite.from('img1.png');
        this.image.anchor.set(0.5,0.5);
        this.addChild(this.image);
    }
    step(dt){
        
        let dPhi = this.TargetCourse-this.course;
        if(dPhi!=0){
            if(dPhi>Math.PI){
                dPhi -= 2*Math.PI;
            }
            if(dPhi<-Math.PI){
                dPhi += 2*Math.PI;
            }
            let MaxTurn = this.turnSpeed*dt;
            if (Math.abs(dPhi)<=MaxTurn){
                this.course = this.TargetCourse;
            }
            else{
                this.course+=MaxTurn*Math.sign(dPhi);
            }
        }
        
        
        
        
        
        let vx = this.speed*Math.sin(this.course);
        let vy = -this.speed*Math.cos(this.course);

        this.x+=vx*dt;
        this.y+=vy*dt;

        this.rotation = this.course;
    }

    move2Point(x1, y1){
        let dx = x1 - this.x;
        let dy = y1 - this.y;
        let phi = Math.atan2(dx, -dy);

        this.TargetCourse = phi;
    }
    makeDecision(){}
    CheckCollision(){}


}
class Player extends MovingObject{
    constructor(x,y){
        super(x,y,0,5)
        this.image.tint = 0x00ff00;
        this.hitPoints = 20;
        this.score = 0;
    }
    makeDecision(){
        this.move2Point(world.mouseX, world.mouseY);
    }

}
class Enemy extends MovingObject{
    constructor(x,y){
        super(x,y,0,1+Math.random()*2)
        this.image.tint = 0xff0000;
    }
    CheckCollision(){
        let dx = world.player.x - this.x;
        let dy = world.player.y - this.y;
        let d = Math.sqrt(dx*dx+dy*dy);

        if(d<=62){
            this.isDead = true;
            world.player.hitPoints -=10;
            
        }
       
    }
    makeDecision(){
        let vec1 = new PIXI.Point(world.player.x-this.x, world.player.y-this.y);
        let otherEnemies = world.listEnemiesAround(this,250);
        let vec2 = new PIXI.Point(0,0);
        let vec3 = new PIXI.Point(0,0);
        let vec4 = new PIXI.Point(0,0);

        for(let i=0; i<otherEnemies.length; i++){
            let obj1 = otherEnemies[i];
            let dx = obj1.x-this.x;
            let dy = obj1.y-this.y;
            let d = Math.sqrt(dx*dx+dy*dy);
            let coef = (250-d)/d;
            vec2.x += -coef*dx;
            vec2.y += -coef*dy;
        }
        let vec5 = new PIXI.Point(vec1.x+vec2.x,vec1.y+vec2.y);
        // this.move2Point(world.player.x, world.player.y);
        this.move2Point(this.x+vec5.x, this.y+vec5.y);
    }
}

class Spawner extends Enemy {
    constructor(x,y){
        super(x,y,0,0);
        this.speed = 0;
        this.image.tint = 0xff00ff;
        this.TimePassed = 0;
        this.LastCreationTime =0;

    }
    CheckCollision(){}
    step(dt){
        super.step(dt)
        this.TimePassed += dt;
    
    }
    makeDecision(){
        super.makeDecision();
        if(this.TimePassed-this.LastCreationTime>=100){
            world.createEnemyObject(this.x,this.y);
            this.LastCreationTime =this.TimePassed;
        }
        
    }
}
class Food extends MovingObject  {
    constructor(x,y){
        super(x,y,2*Math.PI*Math.random(),2)
        this.image.tint = 0xffff00;

    }
    CheckCollision(){
        let dx = world.player.x - this.x;
        let dy = world.player.y - this.y;
        let d = Math.sqrt(dx*dx+dy*dy);

        if(d<=62){
            this.isDead = true;
            world.player.score += 5;
        }
    }
    makeDecision(){
        let dx = world.player.x-this.x;
        let dy = world.player.y-this.y;
        let d = Math.sqrt(dx*dx+dy*dy);
        this.speed = 2;
        if(d<=250){
            this.speed = 4;
            this.move2Point(this.x-dx,this.y-dy);
        }

        if((this.x<0) || (this.x>1900) || (this.y<0) || (this.y>1020)){
            this.move2Point(Math.random()*1980,Math.random()*900)
        }
    }
}
document.addEventListener('keydown' , (e) => {
    world.handlekeyDown(e)
    
})

let mouseX = 0;
let mouseY = 0;

let app = new PIXI.Application({ width:1920, height:1080});
document.body.appendChild(app.view);
let world = new World(app.stage)

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.addEventListener('pointermove', (e) => {
    world.handleMove(e);
});
app.stage.addEventListener('pointerdown', (e) => {
    world.handlekeyDown(e);
});
for(let i=0;i < 1; i++){
    world.createPlayerObject(250,200);
} 
for(let i=0;i < 10; i++){
    world.createObjectOfClass(Food,500,300);
} 
world.createObjectOfClass(Spawner,500,500);
function update(dt){
        world.step(dt);

}



app.ticker.add(update)
