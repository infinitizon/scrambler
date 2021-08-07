import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segment = 'image';

  data: any;
  moves: number;
  constructor(public navCtrl: NavController,public toastController: ToastController) {
    this.moves = 0;
    this.data = [
      [
        {
          row: 0,
          col: 0,
          value: 1,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_1.jpg',
        },
        {
          row: 0,
          col: 1,
          value: 2,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_2.jpg',
        },
        {
          row: 0,
          col: 2,
          value: 3,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_3.jpg',
        },
        {
          row: 0,
          col: 3,
          value: 4,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_4.jpg',
        },
      ],
      [
        {
          row: 1,
          col: 0,
          value: 5,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_5.jpg',
        },
        {
          row: 1,
          col: 1,
          value: 6,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_6.jpg',
        },
        {
          row: 1,
          col: 2,
          value: 7,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_7.jpg',
        },
        {
          row: 1,
          col: 3,
          value: 8,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_8.jpg',
        },
      ],
      [
        {
          row: 2,
          col: 0,
          value: 9,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_9.jpg',
        },
        {
          row: 2,
          col: 1,
          value: 10,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_10.jpg',
        },
        {
          row: 2,
          col: 2,
          value: 11,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_11.jpg',
        },
        {
          row: 2,
          col: 3,
          value: 12,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_12.jpg',
        },
      ],
      [
        {
          row: 3,
          col: 0,
          value: 13,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_13.jpg',
        },
        {
          row: 3,
          col: 1,
          value: 14,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_14.jpg',
        },
        {
          row: 3,
          col: 2,
          value: 15,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_15.jpg',
        },
        {
          row: 3,
          col: 3,
          value: 0,
          isCorrect: true,
          imageUrl: '../../assets/imgs/part_26.jpg',
        },
      ],
    ];
  }
  toastMessage() {
    this.toastController.create({
      message: 'Wrong Move',
      duration: 2000
    }).then(toast =>{
      toast.present();
    });
  }

  generateRandomValue = () => {
    const min = 0;
    const max = 16;
    const rand = Math.ceil(Math.random() * (max - min) + min);
    return rand;
  };

  setValue(row: number, col: number, val: number) {
    this.data[row][col].value = val;
    const correctValue = (row * 4) + col + 1;
    this.data[row][col].isCorrect = (row === 3 && col === 3 && val === 0) ? true : (correctValue === val);
    return this.data[row][col];
  }

  setImage(row: number, col: number, val: string) {
    this.data[row][col].imageUrl = val;
    return this.data[row][col];
  }
  move(row, col) {
    this.moves = this.moves+1;
    const self = this;
    const selectedCell = this.data[row][col];
    let canMove = true;

    if (selectedCell.value === 0) {
      // cant move
      canMove = false;
    }
    let targetCellX = row;
    let targetCellY = col;

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function canMoveRight(dRow, dCol) {
      const i = 1;
      let colTemp = dCol + 1;
      while (colTemp <= 3) {
        if (self.data[dRow][colTemp].value === 0) {
          targetCellY = colTemp;
          return true;
        }
        else {
          colTemp = colTemp + i;
        }
      }
      return false;
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function canMoveUp(dRow, dCol) {
      const i = 1;
      let rowTemp = dRow - i;
      while (rowTemp >= 0) {
        if (self.data[rowTemp][dCol].value === 0) {
          targetCellX = rowTemp;
          return true;
        }
        else {
          rowTemp = rowTemp - i;
        }
      }
      return false;
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function canMoveDown(dRow, dCol) {
      const i = 1;
      let rowTemp = dRow + i;
      while (rowTemp <= 3) {
        if (self.data[rowTemp][dCol].value === 0) {
          targetCellX = rowTemp;
          return true;
        }
        else {
          rowTemp = rowTemp + i;
        }
      }
      return false;
    }

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function canMoveLeft(dRow, dCol) {
      const i = 1;
      let colTemp = dCol - i;
      while (colTemp >= 0) {
        if (self.data[dRow][colTemp].value === 0) {
          targetCellY = colTemp;
          return true;
        }
        else {
          colTemp = colTemp - i;
        }
      }
      return false;
    }

    if (row > 0 && canMoveUp(row, col)) {
      // can move only up
      // get top
      let tempRow = row-1;
      let value = selectedCell.value;
      let imageUrl = selectedCell.imageUrl;
      while(tempRow >= targetCellX)
      {
        const tempValue = this.data[tempRow][col].value;
        const tempUrl = this.data[tempRow][col].imageUrl;
        this.setValue(tempRow, col, value);
        this.setImage(tempRow, col, imageUrl);
        value = tempValue;
        imageUrl = tempUrl;
        tempRow --;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,imageUrl);
    }
    else if (row < 3 && canMoveDown(row, col)) {

      // can move only down
      let tempRow = row+1;
      let value = selectedCell.value;
      let imageUrl = selectedCell.imageUrl;
      while(tempRow <= targetCellX)
      {
        const tempValue = this.data[tempRow][col].value;
        const tempUrl = this.data[tempRow][col].imageUrl;
        this.setValue(tempRow, col, value);
        this.setImage(tempRow, col, imageUrl);
        imageUrl = tempUrl;
        value = tempValue;
        tempRow ++;
      }
      this.setValue(row, col, 0);
      this.setImage(row, col, imageUrl);


    } else if (col > 0 && canMoveLeft(row, col)) {
      // can move only left
      let tempCol = col-1;
      let value = selectedCell.value;
      let imageUrl = selectedCell.imageUrl;
      while(tempCol >= targetCellY)
      {
        const tempValue = this.data[row][tempCol].value;
        const tempUrl = this.data[row][tempCol].imageUrl;
        this.setValue(row, tempCol, value);
        this.setImage(row, tempCol, imageUrl);
        imageUrl = tempUrl;
        value = tempValue;
        tempCol --;
      }
      this.setValue(row, col, 0);
      this.setImage(row, col, imageUrl);

    } else if (col < 3 && canMoveRight(row, col)) {
      // can move only right
      let tempCol = col+1;
      let value = selectedCell.value;
      let imageUrl = selectedCell.imageUrl;
      while(tempCol <= targetCellY)
      {
        const tempValue = this.data[row][tempCol].value;
        const tempUrl = this.data[row][tempCol].imageUrl;
        this.setValue(row, tempCol, value);
        this.setImage(row, tempCol, imageUrl);
        imageUrl = tempUrl;
        value = tempValue;
        tempCol ++;
      }
      this.setValue(row, col, 0);
      this.setImage(row,col,imageUrl);

    } else {
      // cant move
      canMove = false;

    }

    if (canMove) {
      this.isFinished();
      return;
    } else {
      // show message/viber/warn
      //alert('Wrong Move!')
      this.toastMessage();
    }
  }

  isFinished() {
    // check all are in right position
    let movesLeft = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.data[row][col].isCorrect === false) {
          movesLeft = movesLeft + 1;
          return;
        }
      }
    }
    if (movesLeft === 0) {
      alert('congratulation! You Won');
    }
  }
  shuffleBoard = () => {

    const max = 16;
    const randomValues: Array<any> = [];
    let val;
    let rand;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        rand = this.generateRandomValue();
        if (randomValues.indexOf(rand) > -1) {
          do {
            rand = this.generateRandomValue();
          }
          while (randomValues.indexOf(rand) > -1);
          randomValues.push(rand);
          val = rand;
        }
        else {
          randomValues.push(rand);
          val = rand;
        }
        const image = '../../assets/imgs/part_'+val+'.jpg';
        if (val === max) {
          val = 0;
        }
        this.setValue(row, col, val);
        this.setImage(row, col, image);
      }
    }

  };

}
