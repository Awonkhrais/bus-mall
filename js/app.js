'use strict';

let imgArray = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
  'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun',
  'unicorn','usb','water-can','wine-glass'];


// get elment by Id

const imgSection = document.getElementById('imgSection');
const firstImg = document.getElementById('leftImg');
const secondImg = document.getElementById('midImg');
const thirdImg = document.getElementById('rightImg');
imgSection.addEventListener('click',eventHandler);


let clickNumber = 0 ;
let leftImageIndex = 0;
let midImageIndex = 0;
let rightImageIndex = 0;


// Constructor Function
function Images(name){

  this.name = name;
  this.ext = '';
  this.path = '';
  this.shown = 0 ;
  this.clicks=0;
  Images.all.push(this);



}
// give property(all) to constructor function to store all object inside it.
Images.all =[];


// extension function

Images.prototype.generateExt = function(){

  if (this.name === 'usb') {
    this.ext = '.gif';
  }
  else if(this.name === 'sweep'){
    this.ext = '.png';
  }
  else{
    this.ext = '.jpg';
  }

};

Images.prototype.generatePath = function(){

  this.path = './img/' + this.name + this.ext;

};

// to create 18 object

for(let i = 0 ; i<imgArray.length ; i++){

  new Images(imgArray[i]);
  Images.all[i].generateExt();
  Images.all[i].generatePath();

}

// render function

function render (){
  let leftIndex = randomNumberImg(0,imgArray.length-1);
  let midIndex;
  let rightIndex;



  do{
    midIndex = randomNumberImg(0,imgArray.length-1);
    rightIndex = randomNumberImg(0,imgArray.length-1);
  }while((leftIndex === rightIndex || leftIndex === midIndex) || (rightIndex === midIndex));


  firstImg.src = Images.all[leftIndex].path;
  secondImg.src = Images.all[midIndex].path;
  thirdImg.src = Images.all[rightIndex].path;


  leftImageIndex = leftIndex;
  midImageIndex = midIndex;
  rightImageIndex = rightIndex;

  Images.all[leftIndex].shown++;
  Images.all[midIndex].shown++;
  Images.all[rightIndex].shown++;

  //   console.log(Images.all);




}

// event handler


function eventHandler(event){

  if (( event.target.id === 'leftImg' || event.target.id ==='midImg' || event.target.id === 'rightImg') && clickNumber<25 ){

    if( event.target.id === 'leftImg' ) {
      Images.all[leftImageIndex].clicks++;
    }

    if( event.target.id === 'midImg' ) {
      Images.all[midImageIndex].clicks++;
    }



    if( event.target.id === 'rightImg' ) {
      Images.all[rightImageIndex].clicks++;
    }




    clickNumber++;
    render();


  }


  // else if(clickNumber === 25){

  //     // console.log(Images.all);
  //     // showData();


  //   }





}


render();



let results = document.getElementById('result');
let ulElement = document.createElement('ul');
results.appendChild(ulElement);

function showResults(){
  for (let i = 0; i <Images.all.length; i++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Images.all[i].name} had ${Images.all[i].clicks} Votes, and was seen ${Images.all[i].shown} times.`;
  }

}










// Helper function
function randomNumberImg( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}
