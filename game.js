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
    hp: player.name + "s HP: " + player.hp.currentHP,
    exp: "Player Experience: " + player.exp
}
// ***************************************************** 
// Game Constructors
// *****************************************************
// _____________________________________________________
// PLAYER
// _____________________________________________________
function Player() {
    this.name = 'Nick';
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
                console.log('rested!!!');
            }, howLong * 60000);
            console.log('resting...');
        },
        attack: function() {
            // ISSUE 1 - write attack function
        }
    };
    this.weapons = {};
    this.currentWeapon = {};
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
            var attackDmg = randomizer(minDamage, maxDamage);
            player.hp.currentHP -= attackDmg;
            return("You took " + attackDmg + " damage! " +  notify.hp)
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
// POTIONS
// ________________________________________________
var healthPotion = new HealthPotion(20, 40);
// ________________________________________________
// WEAPONS
// ________________________________________________
var sword = new Weapon('Sword', 5, 20);
// ________________________________________________
// PLAYER
// ________________________________________________
var player = new Player();
// ________________________________________________
// ENEMIES
// ________________________________________________
var skeleton =  new Enemy('Skeleton', 5, 15, 15);
