import { Component } from '@angular/core';
import '../data/Soddisfazione.js';
@Component({
  selector: 'secondchart',
  templateUrl: '../templates/secondchart.template.html'
})

export class SecondChartComponent {



	public curr_gender = ""; //Male, Female, Total objects
	public curr_ages = [];//14-17, 18-19, 20-24, 25-34

	public genders = []; //Male, Female, Total objects
	public ages = [];//14-17, 18-19, 20-24, 25-34
	public years = []; //2010, 2011, 2012, ... , 2016
	public ratings = []; //0, 1, 2, 3, ... , 10

	public means = [];

	public lineChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels:string[] = [];
  public lineChartType:string = 'line';
  public lineChartLegend:boolean = true;
  public lineChartData:any[] = [];

  public lineChartColors:Array<any> = [
      {
      	backgroundColor: 'rgba(255,173,255,.2)',
      	borderColor:'rgba(255,173,255,1)'
  },
      {
      	backgroundColor: 'rgba(255,75,147,.2)',
      	borderColor:'rgba(255,75,147,1)'
  },
      {
      	backgroundColor: 'rgba(123,75,147,.2)',
      	borderColor:'rgba(123,75,147,1)'
  },
  {
      	backgroundColor: 'rgba(0,75,147,.2)',
      	borderColor:'rgba(0,75,147,1)'
  }
        ];
 
  constructor(){
  	for (let i = 0; i<dati.length ; i++) { //female, male, all
  		this.genders.push(dati[i].gender);
  		this.ages=Object.keys(dati[i].years);
  		for (let j = 0; j < this.ages.length; j++) {// 14-17, 18-19...
  			this.years=Object.keys(dati[i].years[this.ages[j]]);
  			for(let k = 0; k<this.years.length; k++){ //2010,2011,2012...
  				this.ratings = Object.keys(dati[i].years[this.ages[j]][this.years[k]]);
  			}
  		}
  	}
  	this.curr_gender=this.genders[0];
  	this.curr_ages=JSON.parse(JSON.stringify(this.ages));
  	this.setSameGenderDifferentAge();
  	this.lineChartLabels=this.years;
  }

  setSameGenderDifferentAge(){
  	let lineChartData = [];
  	let chartData = {data:[], label:''}
  	let roughSum = 0;
  	let total = 0;
  	let mean = 0;
  	for (let i = 0; i<dati.length ; i++) { //female, male, all
  		if(dati[i].gender === this.curr_gender){
  			for(let m = 0; m<this.ages.length; m++){// 14-17, 18-19, 20-24, 25-34
  				if(this.curr_ages.lastIndexOf(this.ages[m])>-1){
	  				chartData.label=this.ages[m]; // WE LABEL THIS SET OF DATA WITH THE AGE
	  				for(let j = 0; j<this.years.length; j++){//2010, 2011...
	  					for(let k = 0; k<this.ratings.length; k++){ //Go add real values to graph
	  						roughSum+=dati[i].years[this.ages[m]][this.years[j]][this.ratings[k]]*k;
	  						total+=dati[i].years[this.ages[m]][this.years[j]][this.ratings[k]];
	  					}
	  					chartData.data.push(roughSum/total);
	  					roughSum=total=0;
	  				}
  				}
  				//At the end of an age range, we dave the set and start a new one
  				lineChartData.push(chartData);
  				chartData = {data:[], label:''};
  			}
  		}
  	}
  	for(let l = 0; l<lineChartData.length; l++){
  		this.lineChartData[l]=lineChartData[l];
  	}
  	this.lineChartData = this.lineChartData.slice();//USED TO UPDATE GRAPH
  }

  toggleAge(age:string){
  	if(this.curr_ages.lastIndexOf(age)>-1){
  		this.curr_ages.splice(this.curr_ages.lastIndexOf(age),1);
  	}else{
  		this.curr_ages.push(age);
  	}
  	this.lineChartLabels=this.curr_ages;
  	this.setSameGenderDifferentAge();
  }
  toggleGender(gender:string){
    this.curr_gender=gender;
    this.setSameGenderDifferentAge();
  }  
}
