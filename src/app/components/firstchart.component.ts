import { Component } from '@angular/core';
import '../data/Soddisfazione.js';
@Component({
  selector: 'firstchart',
  templateUrl: '../templates/firstchart.template.html'
})

export class FirstChartComponent {



	public curr_gender = ""; //Male, Female, Total objects
	public curr_age = "";//14-17, 18-19, 20-24, 25-34
	public curr_years = []; //2010, 2011, 2012, ... , 2016

	public genders = []; //Male, Female, Total objects
	public ages = [];//14-17, 18-19, 20-24, 25-34
	public years = []; //2010, 2011, 2012, ... , 2016
	public ratings = []; //0, 1, 2, 3, ... , 10

	public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  	};
  	public barChartLabels:string[] = [];
  	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
 	public barChartData:any[] = [];

  public barChartColors:Array<any> = [
      {backgroundColor: 'rgba(0,75,147,.6)'},
      {backgroundColor: 'rgba(71,75,147,.6)'},
      {backgroundColor: 'rgba(123,75,147,.6)'},
      {backgroundColor: 'rgba(171,75,147,.6)'},
      {backgroundColor: 'rgba(255,75,147,.6)'},
      {backgroundColor: 'rgba(253,49,251,.6)'},
      {backgroundColor: 'rgba(255,173,255,.6)'}  ];


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
  	this.curr_age=this.ages[0];
  	this.curr_years=JSON.parse(JSON.stringify(this.years));
  	this.setSameAgeDifferentYear();
  	this.barChartLabels=this.ratings;
  }

  setSameAgeDifferentYear(){
  	let barChartData = [];
  	let chartData = {data:[], label:''}
  	for (let i = 0; i<dati.length ; i++) { //female, male, all
  		if(dati[i].gender === this.curr_gender){
  			for(let j = 0; j<this.years.length; j++){//2010, 2011...
  				chartData.label=this.years[j];
  				if (this.curr_years.lastIndexOf(this.years[j])>-1){ //IF in the array of selected ones
  					for(let k = 0; k<this.ratings.length; k++){ //Go add real values to graph
  						chartData.data.push(dati[i].years[this.curr_age][this.years[j]][this.ratings[k]]);
  					}
  					barChartData.push(chartData);
  					chartData = {data:[], label:''}
  				}else{// OTHERWISE add 0's
  					for(let k = 0; k<this.ratings.length; k++){
  						chartData.data.push(0);
  					}  					
  					barChartData.push(chartData);
  					chartData = {data:[], label:''}
  				}
  			}
  		}
  	}

  	for(let l = 0; l<barChartData.length; l++){
  		this.barChartData[l]=barChartData[l];
  	}
  	this.barChartData = this.barChartData.slice();//USED TO UPDATE GRAPH
  }

  toggleYear(year:string){
  	if(this.curr_years.lastIndexOf(year)>-1){
  		this.curr_years.splice(this.curr_years.lastIndexOf(year),1);
  	}else{
  		this.curr_years.push(year);
  	}
  	this.barChartLabels=this.curr_years;
  	this.setSameAgeDifferentYear();
  }
  toggleAge(age:string){
  	this.curr_age=age;
  	this.setSameAgeDifferentYear();
  }
  toggleGender(gender:string){
    this.curr_gender=gender;
    this.setSameAgeDifferentYear();
  }    
}
