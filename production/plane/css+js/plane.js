var stage = document.querySelector(".stage")
var buttonStart = document.querySelector(".stage .game-start button.start");
var scenceGame = document.querySelector(".stage .game");
var contentGame = document.querySelector(".stage .game .content");
var ranking = document.querySelector(".game .ranking");
var resurgence = document.querySelector(".game .resurgence");
var restart = document.querySelector(".game .restart");
var dead = document.querySelector(".game .dead");

var typeOurPlane = {
    path: "our-plane.gif",
    boom: "our-plane-boom.gif",
    w: 66,
    h: 80,
    blood: 3,
    delay: 30
};
var typeOurBullet = {
    path: "me.png",
    w: 6,
    h: 14,
    speed: -5,
    blood: 1
};
var typeEnemyBullet = {
    path: "our-bullet.png",
    w: 7,
    h: 15,
    speed: 1,
    blood: 1
};
var typeEnemyPlaneS = {
    path: "enemy-plane-s.png",
    hit: "enemy-plane-s.png",
    boom: "enemy-plane-s-boom.gif",
    w: 34,
    h: 24,
    speed: 3,
    blood: 2,
    delay: 10
};
var typeEnemyPlaneM = {
    path: "enemy-plane-m.png",
    hit: "enemy-plane-m-hit.png",
    boom: "enemy-plane-m-boom.gif",
    w: 46,
    h: 60,
    speed: 3,
    blood: 4,
    delay: 30
};
var typeEnemyPlaneL = {
    path: "enemy-plane-l.png",
    hit: "enemy-plane-l-hit.png",
    boom: "enemy-plane-l-boom.gif",
    w: 110,
    h: 164,
    speed: 2,
    blood: 7,
    delay: 50
};
var buff = {
    path: "弹药箱.png",
    blood: 1,
    speed: 5,
    w: 44,
    h: 30,
    delay: 1
}


var game

//构造器
class Element {
    constructor(type, x, y) {
        this.path = type.path;
        this.x = x;
        this.y = y;
        this.w = type.w;
        this.h = type.h;
        this.s = type.speed;
        this.bullets = [];
        this.b = type.blood;
        this.blood = type.blood;
        this.hit = type.hit;
        this.boom = type.boom;
        this.d = type.delay;
        this.delay = type.delay;
        this.die = false;
        this.score = 0
        this.product = 80
    }
    //更新视图                 
    updataView() {
        this.node.style.left = this.x - this.w / 2 + "px";
        this.node.style.top = this.y - this.h / 2 + "px";
    }
    //创建节点
    draw() {
        this.node = document.createElement("img");
        this.node.src = game.srcPath + this.path;
        contentGame.appendChild(this.node);
        this.updataView();
    }
    //移动子弹和敌方飞机的方法
    move() {
        this.y += this.s;
        this.updataView()
    }
    //创建我方飞机的子弹  和敌方子弹
    createBullet() {
        game.players.forEach((player, index, players) => {
            if (player.buff === true) {
                let left = new Element(typeOurBullet, player.x - 20, player.y + 20)
                let right = new Element(typeOurBullet, player.x + 20, player.y + 20)
                left.draw()
                right.draw()
                player.bullets.push(left, right)
                let newBullet = new Element(typeOurBullet, player.x, player.y)
                newBullet.draw()
                player.bullets.push(newBullet)
            } else {
                var newBullet = new Element(typeOurBullet, player.x, player.y)
                newBullet.draw()
                player.bullets.push(newBullet)
            }
        });
        game.enemys.forEach((enemy, index, enemys) => {
            if (game.framesFade % enemy.product == 0) {
                enemy.product=Math.floor((Math.random*150-80)+80)
                let enemyBullet = new Element(typeEnemyBullet, enemy.x, enemy.y)
                enemyBullet.draw()
                game.enemyBullets.push(enemyBullet)
            }

        });
    }
    //移动所有子弹 
    moveAllBullets() {
        // console.log();

        this.bullets.forEach((bullet, index, bullets) => {
            bullet.move()
            if (bullet.checkTopOver()) {
                contentGame.removeChild(bullet.node)
                bullets.splice(index, 1)
            }
        })
        game.enemyBullets.forEach((bullet, index, bullets) => {
            bullet.move()
            if (bullet.checkTopOver()) {
                contentGame.removeChild(bullet.node)
                bullets.splice(index, 1)
            }
        })
    }
    //检测超出画布
    checkTopOver() {
        if (this.y < -this.h / 2) {
            return true
        }
    }
    //检测超出画布
    checkBottomOver() {
        if (this.y > game.scenceH + this.h / 2) {
            return true
        }
    }
    //检测碰撞
    checkCrash(other) {
        if (this.blood > 0) {
            var hCrash = Math.abs(this.x - other.x) < (this.w + other.w) / 2
            var vCrash = Math.abs(this.y - other.y) < (this.h + other.h) / 2
            return hCrash && vCrash ? true : false
        }
    }
}
// 游戏配置
class Game {
    constructor() {
        this.framesFade = 0;
        this.gameBgPosY = 0;
        this.srcPath = "./images/";
        this.scenceW = parseInt(getComputedStyle(stage).width);
        this.scenceH = parseInt(getComputedStyle(stage).height);
        this.enemyBullets = [],
            this.enemys = [];
        this.players = [];
        this.Buffs = [],
            this.bulletThick = 10;
        this.enemyThick = 30;
        this.Buff = 150,
            this.note = []
    }

    //移动所有的敌机
    moveAllEnemys() {
        this.enemys.forEach((enemy, index, enemys) => {
            enemy.move()
            if (enemy.checkBottomOver()) {
                contentGame.removeChild(enemy.node)
                enemys.splice(index, 1)
            }
        })
        this.Buffs.forEach((buff, index, Buffs) => {
            buff.move()
            if (buff.checkBottomOver()) {
                contentGame.removeChild(buff.node)
                Buffs.splice(index, 1)
            }
        })
    }
    createEnemy(type) {
        let randomNum = Math.floor(Math.random() * this.scenceW);
        let newEnemy = new Element(type, randomNum, -type.h / 2);
        this.enemys.push(newEnemy);
        newEnemy.draw();
    };
    createBuff(type) {
        let randomNum = Math.floor(Math.random() * this.scenceW);
        let newBuff = new Element(type, randomNum, -type.h / 2);
        this.Buffs.push(newBuff);
        newBuff.draw();
    };
    //更新游戏背景
    bgUpdata() {
        this.gameBgPosY++
        scenceGame.style.backgroundPositionY = this.gameBgPosY + "px"
    }
    //生成我方飞机
    createPlayer() {
        var newPlayer = new Element(typeOurPlane, game.scenceW / 4, game.scenceH - typeOurPlane.h / 2)
        game.players.push(newPlayer)
        newPlayer.draw()
        document.querySelector(".game .score .player1").style.display = "block"
    }
    //移动我方飞机有子弹
    moveAllBullets() {
        this.players.forEach((player) => {
            player.bullets.forEach((bullet, index, bullets) => {
                bullet.move()
                if (bullet.checkTopOver()) {
                    contentGame.removeChild(bullet.node)
                    bullets.splice(index, 1)
                }
            })
        })
        game.enemys.forEach((enemy) => {
            game.enemyBullets.forEach((bullet, index, bullets) => {
                bullet.move()
                if (bullet.checkTopOver()) {
                    contentGame.removeChild(bullet.node)
                    bullets.splice(index, 1)
                }
            })
        })
    }
    //检测我方飞机子弹和地方飞机的碰撞
    checkAllCrash = function () {
        game.enemys.forEach(function (enemy, ie, enemys) {
            game.players.forEach(function (player, ip, players) {
                player.bullets.forEach(function (bullet, ib, bullets) {
                    if (enemy.checkCrash(bullet)) {
                        enemy.blood--;
                        bullet.blood--;
                    }
                });
                if (enemy.checkCrash(player) && !player.die) {
                    enemy.blood = 0;
                    player.blood--;
                    player.die = true;
                    player.node.src = game.srcPath + player.boom;
                }
            });
        });
        game.players.forEach(function (player, ip, players) {
            game.Buffs.forEach((buff, index, Buffs) => {
                if (player.checkCrash(buff)) {
                    buff.blood--
                    player.buff = true
                    setTimeout(() => {
                        player.buff = false
                    }, 5000)
                }
            })
            game.enemyBullets.forEach((bullet, index, enemyBullets) => {
                if (player.checkCrash(bullet) && !bullet.die) {
                    bullet.die = true
                    bullet.blood--
                    player.blood--
                    player.die = true;
                    player.node.src = game.srcPath + player.boom;
                }
            })
        });
    };

    //检测所有对象的血量
    checkAllBlood() {
        game.enemys.forEach((enemy, ie, enemys) => {
            if (enemy.blood < enemy.b && enemy.blood > 0) {
                enemy.node.src = game.srcPath + enemy.hit
            } else if (enemy.blood <= 0 && !enemy.die) {
                enemy.die = true
                enemy.node.src = game.srcPath + enemy.boom
            }
        })
        game.players.forEach((player, ip) => {
            player.bullets.forEach((bullet, index, bullets) => {
                if (bullet.blood <= 0) {
                    contentGame.removeChild(bullet.node)
                    bullets.splice(index, 1)
                    player.score++
                    document.querySelectorAll(".game .score span")[ip].innerText = player.score

                    switch (player.score) {
                        case "50":
                            this.bulletThick -= 1;
                            this.enemyThick -= 5;
                            this.Buff += 10
                            break;
                        case "100":
                            this.bulletThick -= 1;
                            this.enemyThick -= 5;
                            this.Buff += 10
                            break;
                        case "150":
                            this.bulletThick -= 1;
                            this.enemyThick -= 5;
                            this.Buff += 10
                            break;
                        case "200":
                            this.bulletThick -= 1;
                            this.enemyThick -= 5;
                            this.Buff += 10
                            break;

                        default:
                            break;
                    }
                }
            });
        })
    }
    //清除死亡飞机
    clearAllDead() {
        game.enemys.forEach((enemy, index, enemys) => {
            if (enemy.die) {
                if (enemy.delay > 0) {
                    enemy.delay--
                } else {
                    contentGame.removeChild(enemy.node)
                    enemys.splice(index, 1)
                }
            }
        })

        //我方飞机生命检测
        game.players.forEach((player, ip, players) => {
            if (player.die) {
                if (player.blood > 0) {
                    if (player.delay > 0) {
                        player.delay--
                    } else {
                        player.node.src = game.srcPath + player.path
                        player.die = false
                        player.delay = player.d
                    }
                } else {
                    game.gameOver()
                }
            }
        });
        game.Buffs.forEach((buff, index, players) => {
            if (buff.blood <= 0 && !buff.die) {
                buff.die = false
                contentGame.removeChild(buff.node)
                game.Buffs.splice(index, 1)
            }
        })
        game.enemyBullets.forEach((bullet, index, Bullets) => {
            if (bullet.blood <= 0 && bullet.die) {

                contentGame.removeChild(bullet.node)
                Bullets.splice(index, 1)
            }
        })
    }
    start() {
        this.setIntervalId = setInterval(() => {
            //这是帧数
            game.framesFade++
            //每帧更新游戏背景
            game.bgUpdata()
            //更新子弹位置
            game.moveAllBullets()
            //每一帧更新敌方飞机
            game.moveAllEnemys()
            //检测碰撞
            game.checkAllCrash()
            //检测血量
            game.checkAllBlood();
            // 清理死亡
            game.clearAllDead();

            //多少帧生成一发子弹
            if (game.framesFade % game.bulletThick === 0) {
                game.players.forEach(player => {
                    if (!player.die) {
                        player.createBullet()
                    }
                })
            }
            //多少帧生成一架敌方飞机
            if (game.framesFade % game.enemyThick === 0) {
                var randomNum = Math.floor(Math.floor(Math.random() * 100))
                if (randomNum < 5) {
                    game.createEnemy(typeEnemyPlaneL);
                } else if (randomNum < 20) {
                    game.createEnemy(typeEnemyPlaneM);
                } else {
                    game.createEnemy(typeEnemyPlaneS);
                }
            }
            if (game.framesFade % game.Buff === 0) {
                game.createBuff(buff)
            }
        }, 30);
        this.state = 1
        ranking.style.marginTop = -ranking.offsetHeight + "px";
        dead.style.bottom = -dead.offsetHeight + "px";
    }
    gameOver() {
        this.pause()
        dead.style.bottom = "100px"
    }
    pause() {
        clearInterval(this.setIntervalId)
        this.state = 0
        document.querySelector(".ranking").style.marginTop = "100px"
    }
}

buttonStart.onclick = () => {
    console.log("xxxx");
    stage.style.marginLeft = "-100%"

    game = new Game()
    game.createPlayer()
    game.start()
}

//根据鼠标位置更行飞机位置
scenceGame.ontouchmove = (event) => {
    game.players[0].x = event.touches[0].pageX
    game.players[0].y = event.touches[0].pageY

    game.players.forEach(player => {
        player.updataView()
    });
}
//点击游戏场景 切换游戏状态
scenceGame.ontouchstart = (start) => {
    let startX = start.touches[0].clientX
    let startY = start.touches[0].clientY
    document.body.ontouchend = (end) => {
        let endX = end.changedTouches[0].clientX
        let endY = end.changedTouches[0].clientY

        if (startX === endX && startY === endY) {
            if (game.state === 0) {
                game.start();
            } else {
                game.pause();
            }
        }
    }
}
restart.onclick = function () {
    window.location.reload();
};

resurgence.onclick = function () {
    // 充值买命
    game.players.forEach(function (player, index, players) {
        players[index].blood = 3;
    });
    dead.style.bottom = -dead.offsetHeight + "px";
};
document.querySelectorAll('#tab tbody tr').forEach((e, index, arr) => {

    e.children[0].innerText = "虚席以待"
    e.children[1].innerText = "0"
    e.children[2].innerText = index
});