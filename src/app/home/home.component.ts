import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location/interface/housinglocation";
import { HousingService } from "../housing-location/service/housing.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: "home.component.html",
  styleUrl: './home.component.css'
})
export class HomeComponent
{
  private housingService: HousingService;
  private housingLocationList: HousingLocation[] = [];
  public filteredLocationList: HousingLocation[] = [];

  constructor(housingService: HousingService)
  {
    this.housingService = housingService;
  }

  ngOnInit(): void
  {
    const housingLocationList: Observable<HousingLocation[]> = this.housingService.getAllHousingLocations();

    housingLocationList.subscribe(housingLocationList => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList
    });
  }

  public filterResults(text: string): void
  {
    if (!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
