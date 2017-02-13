var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import '../data/Soddisfazione.js';
export var SecondChartComponent = (function () {
    function SecondChartComponent() {
        this.curr_gender = ""; //Male, Female, Total objects
        this.curr_ages = []; //14-17, 18-19, 20-24, 25-34
        this.genders = []; //Male, Female, Total objects
        this.ages = []; //14-17, 18-19, 20-24, 25-34
        this.years = []; //2010, 2011, 2012, ... , 2016
        this.ratings = []; //0, 1, 2, 3, ... , 10
        this.means = [];
        this.lineChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.lineChartLabels = [];
        this.lineChartType = 'line';
        this.lineChartLegend = true;
        this.lineChartData = [];
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(255,173,255,.2)',
                borderColor: 'rgba(255,173,255,1)'
            },
            {
                backgroundColor: 'rgba(255,75,147,.2)',
                borderColor: 'rgba(255,75,147,1)'
            },
            {
                backgroundColor: 'rgba(123,75,147,.2)',
                borderColor: 'rgba(123,75,147,1)'
            },
            {
                backgroundColor: 'rgba(0,75,147,.2)',
                borderColor: 'rgba(0,75,147,1)'
            }
        ];
        for (var i = 0; i < dati.length; i++) {
            this.genders.push(dati[i].gender);
            this.ages = Object.keys(dati[i].years);
            for (var j = 0; j < this.ages.length; j++) {
                this.years = Object.keys(dati[i].years[this.ages[j]]);
                for (var k = 0; k < this.years.length; k++) {
                    this.ratings = Object.keys(dati[i].years[this.ages[j]][this.years[k]]);
                }
            }
        }
        this.curr_gender = this.genders[0];
        this.curr_ages = JSON.parse(JSON.stringify(this.ages));
        this.setSameGenderDifferentAge();
        this.lineChartLabels = this.years;
    }
    SecondChartComponent.prototype.setSameGenderDifferentAge = function () {
        var lineChartData = [];
        var chartData = { data: [], label: '' };
        var roughSum = 0;
        var total = 0;
        var mean = 0;
        for (var i = 0; i < dati.length; i++) {
            if (dati[i].gender === this.curr_gender) {
                for (var m = 0; m < this.ages.length; m++) {
                    if (this.curr_ages.lastIndexOf(this.ages[m]) > -1) {
                        chartData.label = this.ages[m]; // WE LABEL THIS SET OF DATA WITH THE AGE
                        for (var j = 0; j < this.years.length; j++) {
                            for (var k = 0; k < this.ratings.length; k++) {
                                roughSum += dati[i].years[this.ages[m]][this.years[j]][this.ratings[k]] * k;
                                total += dati[i].years[this.ages[m]][this.years[j]][this.ratings[k]];
                            }
                            chartData.data.push(roughSum / total);
                            roughSum = total = 0;
                        }
                    }
                    //At the end of an age range, we dave the set and start a new one
                    lineChartData.push(chartData);
                    chartData = { data: [], label: '' };
                }
            }
        }
        for (var l = 0; l < lineChartData.length; l++) {
            this.lineChartData[l] = lineChartData[l];
        }
        this.lineChartData = this.lineChartData.slice(); //USED TO UPDATE GRAPH
    };
    SecondChartComponent.prototype.toggleAge = function (age) {
        if (this.curr_ages.lastIndexOf(age) > -1) {
            this.curr_ages.splice(this.curr_ages.lastIndexOf(age), 1);
        }
        else {
            this.curr_ages.push(age);
        }
        this.lineChartLabels = this.curr_ages;
        this.setSameGenderDifferentAge();
    };
    SecondChartComponent.prototype.toggleGender = function (gender) {
        this.curr_gender = gender;
        this.setSameGenderDifferentAge();
    };
    SecondChartComponent = __decorate([
        Component({
            selector: 'secondchart',
            templateUrl: '../templates/secondchart.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SecondChartComponent);
    return SecondChartComponent;
}());
//# sourceMappingURL=secondchart.component.js.map