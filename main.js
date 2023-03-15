
// requiring in the prompt-sync Node module
const prompt = require('prompt-sync')({sigint: true});

// defining possible fields
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// creating the playing field as a class
class Field {
  constructor(field) {
    this.field = field;
  }

  // this method prints the playing field to the console without commas and with line breaks
  print() {
    let joinedArr = [];
    for (let i = 0; i < this.field.length; i++) {
      let newArr = this.field[i].join('');
      joinedArr.push(newArr);
    }
    console.log(joinedArr.join('\r\n'));
  }

  // with this method we can generate a randomized playing field. we need to add the dimensions of the field and the probability of each field having a hole
  generateField(x,y,prob) {
    if (x < 1 || y < 1 || prob < 1 || prob > 10) {
      throw new Error('Please select a positive integer as height and width and a probability between 1 and 10.');
    };
    this.field = [];
    for (let i = 0; i < y; i++) {
      this.field.push([]);
    };
    for (let j = 0; j < this.field.length; j++) {
      for (let k = 0; k < x; k++) {
        let random = Math.ceil(Math.random() * 10);
        if(random <= prob) {
          this.field[j].push('O');
        } else {
          this.field[j].push('░');
        }
      }
    }
    // adding the starting point and randomly selecting the location of the hat -> hat cannot be in the starting point
    this.field[0][0] = '*';
    let hatXPos = Math.ceil(Math.random() * x);
    let hatYPos = Math.ceil(Math.random() * y);
    this.field[hatYPos][hatXPos] = '^';
  }
};

// creating a new field
let myField = new Field();
myField.generateField(4,5,5);
myField.print();

// coordinates to keep track of the player's position
let xPos = 0;
let yPos = 0;

let move = prompt('Which way?');

while (move) {
  switch (move) {
    case 'left':
      // making sure that the player can actually move in the direction 
      if (xPos > 0) {
        xPos--;
        // if the new field is a "field", we change it to a "path" character
        if (myField.field[yPos][xPos] === fieldCharacter) {
          myField.field[yPos][xPos] = pathCharacter;
          myField.print();
          move = prompt('Which way now?');
        
        // if the new field is a hole, the player loses and the game is halted
        } else if (myField.field[yPos][xPos] === hole) {
            console.log('Oh noo, you fell down a hole!');
            move = false;

        // if the new field is the hat, the player wins and the game is halted
        } else if (myField.field[yPos][xPos] === hat) {
            console.log('Yes! You found your hat!!');
            move = false;

        // if the player moves back to a previous path field, the field before changes back to a field character -> PLACE FOR IMPROVEMENT: make this only a possibility if it is a "back-and-forth" movement and not going in a circle
        } else {
          myField.field[yPos][xPos + 1] = fieldCharacter;
          myField.print();
          move = prompt('Which way now?');
        }

      // handling moves that would bring the player off the field 
      } else {
        move = false;
        console.log("You can't move that way.")
        myField.print();
        move = prompt('Which way now?');
      };
      break;

    case 'right':
      if (xPos < myField.field[yPos].length - 1) {
        xPos++;
        if (myField.field[yPos][xPos] === fieldCharacter) {
          myField.field[yPos][xPos] = pathCharacter;
          myField.print();
          move = prompt('Which way now?');
        } else if (myField.field[yPos][xPos] === hole) {
            console.log('Oh noo, you fell down a hole!');
            move = false;
        } else if (myField.field[yPos][xPos] === hat) {
            console.log('Yes! You found your hat!!');
            move = false;
        } else {
          myField.field[yPos][xPos - 1] = fieldCharacter;
          myField.print();
          move = prompt('Which way now?');
        }
      } else {
        move = false;
        console.log("You can't move that way.")
        myField.print();
        move = prompt('Which way now?');
      };
      break;

    case 'down':
      if (yPos < myField.field.length - 1) {
        yPos++;
        if (myField.field[yPos][xPos] === fieldCharacter) {
          myField.field[yPos][xPos] = pathCharacter;
          myField.print();
          move = prompt('Which way now?');
        } else if (myField.field[yPos][xPos] === hole) {
            console.log('Oh noo, you fell down a hole!');
            move = false;
        } else if (myField.field[yPos][xPos] === hat) {
            console.log('Yes! You found your hat!!');
            move = false;
        } else {
          myField.field[yPos - 1][xPos] = fieldCharacter;
          myField.print();
          move = prompt('Which way now?');
        }
      } else {
        move = false;
        console.log("You can't move that way.")
        myField.print();
        move = prompt('Which way now?');
      };
      break;

    case 'up':
      if (yPos > 0) {
        yPos--;
         if (myField.field[yPos][xPos] === fieldCharacter) {
          myField.field[yPos][xPos] = pathCharacter;
          myField.print();
          move = prompt('Which way now?');
        } else if (myField.field[yPos][xPos] === hole) {
            console.log('Oh noo, you fell down a hole!');
            move = false;
        } else if (myField.field[yPos][xPos] === hat) {
            console.log('Yes! You found your hat!!');
            move = false;
        } else {
          myField.field[yPos + 1][xPos] = fieldCharacter;
          myField.print();
          move = prompt('Which way now?');
        }
      } else {
        move = false;
        console.log("You can't move that way.")
        myField.print();
        move = prompt('Which way now?');
      };
      break;
    
    default:
        move = false;
        console.log("Please enter either 'up', 'down', 'left' or 'right.")
        myField.print();
        move = prompt('Which way now?');
  };
}
