import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
declare var $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  menuArr: MainArrayType[] = [];
  dashboardMainMenu;
  test: boolean = false;
  sep: any = 0;

  title = "difuze dashborad";

  permissions: any[] = [
    "ET Details View",
    "ET Details Edit",
    "ET Search",
    "ET Location",
    "ET Template View",
    "ET Template Edit",
    "User Permission View",
    "User Permission Edit",
    "WF View",
    "WF Template Edit",
      "WF Operator",
      "Notification View",
      "Notification Edit",
      "TM Admin",
      "TM View",
      "Title View",
      "Title Edit",
      "TS Admin",
      "TS View",
      "TS Operator",
      "CDN View",
      "Folder View",
      "Folder Edit",
      "QueryViewer",
      "Metadata View",
      "Metadata Model Admin",
      "Metadata Admin",
      "Bulk Order Operator",
      "Bulk Order Admin",
      "notify",
      "bop",
      "abc1",
      "abc2",
      "abc3",
      "abc4",
      "abc5",
      "abc6",
      "abc7",
    "abc8",
    "abc9",
    "abc10",
    "abc11",
    "abc12"
  ];

  constructor(private httpService: HttpClient) {}
  ngOnInit() {
    this.httpService.get("./assets/header.json").subscribe(
      data => {
        //debugger;
        this.dashboardMainMenu = data;
        this.sep = this.dashboardMainMenu.length - 2;

        for (let schild of this.dashboardMainMenu) {
          this.menuArr.push(schild.child);
          if (schild.child && schild.child.length > 0) {
            schild.child.forEach((x: any) => {
              if (this.permissions.includes(x.Permission)) {
                x.Visible = "true";
                schild.Visible = "true";
                if(x.subchild.length > 0){
                  x.subchild.forEach((y: any) =>{
                    if(this.permissions.some(a=> y.Permission.includes(a))){
                    y.Visible = "true";               
                    }
                  })
                }
              }
            });
          }
          if (this.permissions.includes(schild.Permission)) {
            schild.Visible = "true";
          }
        }

        // this.dashboardMainMenu.forEach(element => {
        //   if (element.Visible == "true") {
        //     this.sep++;
        //   }
        // });

        // this.sep = this.sep - 2;
        // console.log(this.sep);
      },

      (err: HttpErrorResponse) => {
        console.log(err.message);
      },

      () => {}
    );
  }
}
export class MainArrayType {
  applicationName: string;
  url: string;
}
