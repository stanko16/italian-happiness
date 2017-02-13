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
export var FirstChartComponent = (function () {
    function FirstChartComponent() {
        this.curr_gender = ""; //Male, Female, Total objects
        this.curr_age = ""; //14-17, 18-19, 20-24, 25-34
        this.curr_years = []; //2010, 2011, 2012, ... , 2016
        this.genders = []; //Male, Female, Total objects
        this.ages = []; //14-17, 18-19, 20-24, 25-34
        this.years = []; //2010, 2011, 2012, ... , 2016
        this.ratings = []; //0, 1, 2, 3, ... , 10
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [];
        this.barChartColors = [
            { backgroundColor: 'rgba(0,75,147,.6)' },
            { backgroundColor: 'rgba(71,75,147,.6)' },
            { backgroundColor: 'rgba(123,75,147,.6)' },
            { backgroundColor: 'rgba(171,75,147,.6)' },
            { backgroundColor: 'rgba(255,75,147,.6)' },
            { backgroundColor: 'rgba(253,49,251,.6)' },
            { backgroundColor: 'rgba(255,173,255,.6)' }];
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
        this.curr_age = this.ages[0];
        this.curr_years = JSON.parse(JSON.stringify(this.years));
        this.setSameAgeDifferentYear();
        this.barChartLabels = this.ratings;
    }
    FirstChartComponent.prototype.setSameAgeDifferentYear = function () {
        var barChartData = [];
        var chartData = { data: [], label: '' };
        for (var i = 0; i < dati.length; i++) {
            if (dati[i].gender === this.curr_gender) {
                for (var j = 0; j < this.years.length; j++) {
                    chartData.label = this.years[j];
                    if (this.curr_years.lastIndexOf(this.years[j]) > -1) {
                        for (var k = 0; k < this.ratings.length; k++) {
                            chartData.data.push(dati[i].years[this.curr_age][this.years[j]][this.ratings[k]]);
                        }
                        barChartData.push(chartData);
                        chartData = { data: [], label: '' };
                    }
                    else {
                        for (var k = 0; k < this.ratings.length; k++) {
                            chartData.data.push(0);
                        }
                        barChartData.push(chartData);
                        chartData = { data: [], label: '' };
                    }
                }
            }
        }
        for (var l = 0; l < barChartData.length; l++) {
            this.barChartData[l] = barChartData[l];
        }
        this.barChartData = this.barChartData.slice(); //USED TO UPDATE GRAPH
    };
    FirstChartComponent.prototype.toggleYear = function (year) {
        if (this.curr_years.lastIndexOf(year) > -1) {
            this.curr_years.splice(this.curr_years.lastIndexOf(year), 1);
        }
        else {
            this.curr_years.push(year);
        }
        this.barChartLabels = this.curr_years;
        this.setSameAgeDifferentYear();
    };
    FirstChartComponent.prototype.toggleAge = function (age) {
        this.curr_age = age;
        this.setSameAgeDifferentYear();
    };
    FirstChartComponent.prototype.toggleGender = function (gender) {
        this.curr_gender = gender;
        this.setSameAgeDifferentYear();
    };
    FirstChartComponent = __decorate([
        Component({
            selector: 'firstchart',
            templateUrl: '../templates/firstchart.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FirstChartComponent);
    return FirstChartComponent;
}());
//# sourceMappingURL=firstchart.component.js.map