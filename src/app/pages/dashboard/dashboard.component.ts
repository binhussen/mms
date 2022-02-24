import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, single} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HttpClient} from "@angular/common/http";
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  /**
   * dashboard report design
   *
   */

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Board', cols: 1, rows: 1 },
          { title: 'lineChart', cols: 1, rows: 1 },
          { title: 'pieChart', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'board', cols: 2, rows: 1 },
        { title: 'lineChart', cols: 1, rows: 1 },
        { title: 'pieChart', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
  constructor(
    private http: HttpClient, 
    private breakpointObserver: BreakpointObserver, 
    private dashboardService : DashboardService,
    ) {
    }
  localError() {
    throw Error('The app component has thrown an error!');
  }

  failingRequest() {
    this.http.get('https://httpstat.us/404?sleep=2000').toPromise();
  }

  successfulRequest() {
    this.http.get('https://httpstat.us/200?sleep=2000').toPromise();
  }

  //
  
  //
  numberOfRequests! : number;
  numberOfDamages! : number;
  numberOfWeapon! : number;
  numberOfBullet! : number;
  numberOfOther! : number;
  //Pie Chart
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  pieChartData = [
    {
      "name": "Weapon",
      "value": 1,
    },
    {
      "name": "Bullet",
      "value": 1,
    },
    {
      "name": "Other",
      "value": 1,
    },
    {
      "name": "Requests",
      "value": 1,
    },
    {
      "name": "Damages",
      "value": 1,
    }
  ];
  //
  statCardList = [
    {
      icon: "storefront",
      title: "Number of Weapons",
      amount: 10
    },
    {
      icon: "store",
      title: "Number Of Bullets",
      amount: 20
    },
    {
      icon: "shopping_cart",
      title: "Number of Requests",
      amount: 30
    },
    {
      icon: "shopping_cart",
      title: "Number Of Damages",
      amount: 0
    }
  ];
  //Line Chart
   // options
  view: any[] = [700, 300];

   legend: boolean = true;
   animations: boolean = true;
   xAxis: boolean = true;
   yAxis: boolean = true;
   showYAxisLabel: boolean = true;
   showXAxisLabel: boolean = true;
   xAxisLabel: string = 'Year';
   yAxisLabel: string = 'Weapon';
   timeline: boolean = true;

  lineChart = [
    {
      "name": "Inventory",
      "series": [
        {
          "name": "2012",
          "value": 10
        },
        {
          "name": "2013",
          "value": 20
        },
        {
          "name": "2014",
          "value": 30
        }
      ]
    },
  
    {
      "name": "Distribute",
      "series": [
        {
          "name": "2012",
          "value": 14
        },
        {
          "name": "2013",
          "value": 20
        },
        {
          "name": "2014",
          "value": 50
        }
      ]
    },
  ];

  
  ngOnInit(){
    this.getData();
  }

  getData(){
    // number of requests
    this.dashboardService.findAll('http://localhost:3000/requests').subscribe(val =>
    this.numberOfRequests = val.length);
    // number of damages
    this.dashboardService.findAll('http://localhost:3000/damages').subscribe(val =>
     this.numberOfDamages = val.length);
    // number of weapons
    this.dashboardService.findAll('http://localhost:3000/weaponItems',{weaponType:'Weapon'}).subscribe(val =>
     this.numberOfWeapon = val.length);
    // number of bullets
    this.dashboardService.findAll('http://localhost:3000/weaponItems',{weaponType:'Bullet'}).subscribe(val =>
     this.numberOfBullet = val.length);
    // number of other
    this.dashboardService.findAll('http://localhost:3000/weaponItems',{weaponType:'Other'}).subscribe(val =>
     {
       this.numberOfOther = val.length;
      // update chart
       this.getCharts();
      //  update board
      this.getBoard();
    });
  }

  getCharts(){
    this.pieChartData = [
      {
        "name": "Weapon",
        "value": this.numberOfWeapon
      },
      {
        "name": "Bullet",
        "value": this.numberOfBullet
      },
      {
        "name": "Other",
        "value": this.numberOfOther
      },
      {
        "name": "Requests",
        "value": this.numberOfRequests
      },
      {
        "name": "Damages",
        "value": this.numberOfDamages
      }
    ];
  }

  getBoard(){
    this.statCardList = [
      {
        icon: "storefront",
        title: "Number of Weapons",
        amount: this.numberOfWeapon
      },
      {
        icon: "store",
        title: "Number Of Bullets",
        amount: this.numberOfBullet
      },
      {
        icon: "shopping_cart",
        title: "Number of Requests",
        amount: this.numberOfRequests
      },
      {
        icon: "shopping_cart",
        title: "Number Of Damages",
        amount: this.numberOfDamages
      }
    ];
  }
}
