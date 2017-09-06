// ****************************************************
// Library
// ****************************************************
// ____________________________________________________
// RANDOMIZER
// ____________________________________________________
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// ____________________________________________________
// NOTIFICATIONS
// ____________________________________________________
var notify = {
    hp: function() {
        return player.name + "s HP: " + player.hp.currentHP;
    },
    exp: function() {
        return "Player Experience: " + player.exp;
    },
    died: function() {
        console.log(player.name + " has died.");
    }
}
// ***************************************************** 
// Game Constructors
// *****************************************************
// _____________________________________________________
// GAME
// _____________________________________________________
function Game() {
    this.options = {
        reset: function() { 
                 player = new Player();
                 console.log("Game has been reset!");
            }
    }
}
// _____________________________________________________
// LEVEL
// _____________________________________________________
function Level(name, expRequired) {
    this.name = name;
    this.expRequired = expRequired;
    this.enemies = {}

}
// _____________________________________________________
// PLAYER
// _____________________________________________________
function Player(name) {
    this.name = name;
    this.dead = false;
    this.hp = {
        currentHP: 100,
        maxHP: 100,
        minHP: 0
    };
    this.energy = {
        currentEnergy: 100,
        maxEnergy: 100,
        minEnergy: 0
    };
    this.exp = 0;
    this.resources = {
        wood: 0,
        stone: 0,
        gold: 0,
        iron: 0
    };
    this.actions = {
        mine: function(resource) {
            if(player.energy.currentEnergy >= 10) {
                console.log('mining ' + resource + '...');
                player.energy.currentEnergy -= 10;
                player.resources[resource] += 10;
            }
        },
        rest: function(howLong) {
            setTimeout(function () {
                player.hp.currentHP += howLong * 25;
                console.log('rested! ' + player.name + " +" + howLong * 25);
            }, howLong * 60000);
            console.log('resting...');
        },
        attack: function() {
            // ISSUE #1 - write attack function
            // currentWeapon.attack
            // randomizer(minDMG, maxDMG)
            // current enemy [].currentHP -= attackDMG
        }
    };
    this.weapons = {
        currentWeapon: [],
        equipWeapon: function(weapon) {
            this.currentWeapon = [];
            this.currentWeapon.push(weapon);
        }
    };

};
// _____________________________________________________
// ENEMY
// _____________________________________________________
function Enemy(name, minDamage, maxDamage, exp) {
    this.name =  name;
    this.exp = exp;
    this.hp = {
        currentHP: 100,
        maxHP: 100,
        minHP: 0
    };
    this.damage = {
        minDamage: minDamage,
        maxDamage: maxDamage
    }
    this.actions = {
        attack: function() {
            if(player.dead == false && player.hp.currentHP > 0) {
                var attackDmg = randomizer(minDamage, maxDamage);
                player.hp.currentHP -= attackDmg;
                if(player.hp.currentHP > 0) {
                    return("You took " + attackDmg + " damage! " +  notify.hp());
                } else {
                    notify.died();
                    game.options.reset();
                }
            } else {
                console.log("Error..");
            }
        }
    }
};
// _____________________________________________________
// WEAPON
// _____________________________________________________
function Weapon(name, minDamage, maxDamage) {
    this.name = name;
    this.damage = {
        maxDamage: maxDamage,
        minDamage: minDamage
    };
    this.attackDmg = function() {
        return randomizer(this.minDamage, this.maxDamage);
    };
};
// ________________________________________________
// POTION
// ________________________________________________
function HealthPotion(minRecover, maxRecover) {
    this.recovery = {
        minRecover: minRecover,
        maxRecover: maxRecover
    };
    this.heal = function() {
        player.hp.currentHP += randomizer(minRecover, maxRecover);
        console.log("new hp: " + player.hp.currentHP);
    };
};
// ***************************************************** 
// Game Objects
// *****************************************************
// ________________________________________________
// GAME
// ________________________________________________
var game = new Game();
// ________________________________________________
// ________________________________________________
// LEVELS
// ________________________________________________
var lvl1 = new Level('The Jungle', 0);
lvl1.enemies.skeleton = skeleton;
// ________________________________________________
// POTIONS
// ________________________________________________
var healthPotion = new HealthPotion(20, 40);
// ________________________________________________
// WEAPONS
// ________________________________________________
var sword    = new Weapon('Sword', 5, 20);
var smallAxe = new Weapon('Small Axe', 10, 15);
// ________________________________________________
// PLAYER
// ________________________________________________
var player = new Player('Nick');
// ________________________________________________
// ENEMIES
// ________________________________________________
var skeleton =  new Enemy('Skeleton', 5, 15, 15);
