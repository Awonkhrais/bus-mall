'use strict';

let imgArray = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg',
'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg',
'unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];


// get elment by Id

const imgSection = document.getElementById('imgSection');
const firstImg = document.getElementById('leftImg');
const secondImg = document.getElementById('midImg');
const thirdImg = document.getElementById('rightImg');
const viewresult = document.getElementById('viewresult');
const resultcontainer = document.getElementById('result')
imgSection.addEventListener('click',eventHandler);
viewresult.addEventListener('click',showResults);


let clickNumber = 0 ;
let leftImageIndex = 0;
let midImageIndex = 0;
let rightImageIndex = 0;
let leftNewIndex = 0;
let midNewIndex = 0;
let rightNewIndex = 0;



// Constructor Function
function Images(name){

  this.name =name.split('.')[0];
  // this.ext = '';
  this.path = 'img/'+name;
  this.shown = 0 ;
  this.clicks=0;
  Images.all.push(this);



}
// give property(all) to constructor function to store all object inside it.
Images.all =[];



// to create 18 object

for(let i = 0 ; i<imgArray.length ; i++){

  new Images(imgArray[i]);
 

}

// render function

function render (){
  let leftIndex;
  let midIndex;
  let rightIndex;
 



  do{
     leftIndex= randomNumberImg(0,imgArray.length-1);
    midIndex = randomNumberImg(0,imgArray.length-1);
    rightIndex = randomNumberImg(0,imgArray.length-1);
  }while(leftIndex === rightIndex || leftIndex === midIndex || rightIndex === midIndex || rightIndex === leftNewIndex|| rightIndex === midNewIndex|| rightIndex === rightNewIndex|| leftIndex === leftNewIndex|| leftIndex === midNewIndex || leftIndex === rightNewIndex || midIndex === leftNewIndex || midIndex === midNewIndex || midIndex === rightNewIndex ) 




  firstImg.src = Images.all[leftIndex].path;
  secondImg.src = Images.all[midIndex].path;
  thirdImg.src = Images.all[rightIndex].path;


  leftImageIndex = leftIndex;
  midImageIndex = midIndex;
  rightImageIndex = rightIndex;

  Images.all[leftIndex].shown++;
  Images.all[midIndex].shown++;
  Images.all[rightIndex].shown++;

   leftNewIndex = leftIndex;
   midNewIndex = midIndex;
   rightNewIndex = rightIndex;

  //   console.log(Images.all);




}

// event handler

let count = 25;
function eventHandler(event){

  if (( event.target.id === 'leftImg' || event.target.id ==='midImg' || event.target.id === 'rightImg') && clickNumber<count ){

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
    // console.log(event);

     } else {
    renderChart();
  }


  }



render();






function showResults(event){
  let ulElement = document.createElement('ul');
resultcontainer.appendChild(ulElement);
  for (let i = 0; i <Images.all.length; i++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Images.all[i].name} had ${Images.all[i].clicks} Votes, and was seen ${Images.all[i].shown} times.`;
  }

viewresult.removeEventListener('click',showResults);


}



// renderchart function

function renderChart() {

  let clicks = [];
  let names = [];
  let shown = [];
  for( let i = 0; i < Images.all.length; i++ ) {
    clicks.push( Images.all[i].clicks );
    names.push( Images.all[i].name );
    shown.push( Images.all[i].shown );

  }
  




var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
        label: '# of clicks',
        data: clicks,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }, {
        label: '# of shown',
        data: shown,
        backgroundColor:
          'rgba(144, 99, 100, 0.2)',
        borderColor:
          'rgba(144, 99, 100, 1)',
        borderWidth: 1,
      }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
  }










// Helper function
function randomNumberImg( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}
