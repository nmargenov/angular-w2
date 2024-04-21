import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IBook } from './IBook';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksApp';

  public index = 0;

  public books: IBook[] = [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      description: "The first book in the Harry Potter series, where Harry discovers he's a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry.",
      author: "J.K. Rowling",
      rating: [4, 5, 4, 5, 3, 5]
    },
    {
      id: 2,
      title: "The Lord of the Rings",
      description: "A fantasy epic that follows the quest to destroy the One Ring, which holds great power and threatens Middle-earth.",
      author: "J.R.R. Tolkien",
      rating: [5, 4, 5, 4, 5, 4]
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      description: "A novel by Harper Lee set in the Depression-era South, addressing racial injustice through the trial of a black man accused of raping a white woman.",
      author: "Harper Lee",
      rating: [4, 5, 4, 3, 5, 4]
    },
    {
      id: 4,
      title: "The Catcher in the Rye",
      description: "A novel by J.D. Salinger, narrated by a teenager who feels disconnected from the adult world and struggles with the phoniness of society.",
      author: "J.D. Salinger",
      rating: [3, 4, 3, 4, 3, 4]
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      description: "A classic romance novel by Jane Austen, following the lives and love interests of the Bennet sisters in Georgian England.",
      author: "Jane Austen",
      rating: [4, 5, 4, 3, 5, 4]
    },
    {
      id: 6,
      title: "The Great Gatsby",
      description: "A novel by F. Scott Fitzgerald set in the Jazz Age, portraying the glamorous and decadent lifestyles of the wealthy elite.",
      author: "F. Scott Fitzgerald",
      rating: [3, 4, 3, 2, 4, 3]
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      description: "A novel by J.D. Salinger, narrated by a teenager who feels disconnected from the adult world and struggles with the phoniness of society.",
      author: "J.D. Salinger",
      rating: [4, 3, 5, 4, 3, 4]
    }
  ];

  private tempBookInfo = {
    title: '',
    description: '',
    author: ''
  }

  public titleReference;
  public descriptionReference;
  public authorReference;

  public ratedAll:boolean=false;
  public hasFinished:boolean=false;

  private changeIndex() {
    this.index++;
    if (this.index >= this.books.length) {
      this.ratedAll=true;
    }
  }

  public getInfo(input: any) {
    this.tempBookInfo[input.target.id] = input.target.value;
    switch(input.target.id){
      case 'title':
        this.titleReference = input.target;
        break;
      case 'description':
        this.descriptionReference = input.target;
        break;
      case 'author':
        this.authorReference= input.target;
        break;
    }
  }

  public readAgain(){
    this.index=0;
    this.ratedAll=false;
  }

  public finish(){
    this.hasFinished=true;
  }

  public editBook(){
    Object.entries(this.tempBookInfo).forEach(([key, value]: [string, string]) => {
      if (value !== '') {
        this.books[this.index][key] = value;
      }
    });
    this.resetFields();
  }
  

  private resetFields(){
    if(this.authorReference){
      this.authorReference.value='';
    }
    if(this.titleReference){
      this.titleReference.value='';
    }
    if(this.descriptionReference){
      this.descriptionReference.value='';
    }
    this.tempBookInfo={
      title: '',
      description: '',
      author: ''
    }
  }

  public giveRating(rating: number) {
    this.books[this.index].rating.push(rating);
    this.editBook();
    this.nextBook();
  }

  public nextBook(){
    this.changeIndex();
  }

  public calculateRating(ratings: number[]) {
    let sum = 0;
    ratings.forEach(rate => {
      sum += rate;
    });
    const average = sum / ratings.length;
    return average.toFixed(1);
  }
}
