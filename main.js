const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  }
  print() {
    let joinedArr = [];
    for (let i = 0; i < this.field.length; i++) {
      let newArr = this.field[i].join('');
      joinedArr.push(newArr);
    }
    console.log(joinedArr.join('\r\n'));
  }
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
    this.field[0][0] = '*';
    let hatXPos = Math.ceil(Math.random() * x);
    let hatYPos = Math.ceil(Math.random() * y);
    this.field[hatYPos][hatXPos] = '^';
  }
};

let myField = new Field();
myField.generateField(4,5,5);
myField.print();

let xPos = 0;
let yPos = 0;

let move = prompt('Which way?');

while (move) {
  switch (move) {
    case 'left':
      if (xPos > 0) {
        xPos--;
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
          myField.field[yPos][xPos + 1] = fieldCharacter;
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
