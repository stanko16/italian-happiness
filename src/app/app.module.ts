import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { MainComponent } from './components/main.component';
import { FirstChartComponent } from './components/firstchart.component';
import { SecondChartComponent } from './components/secondchart.component';

@NgModule({
  declarations: [
    MainComponent,
    FirstChartComponent,
    SecondChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
