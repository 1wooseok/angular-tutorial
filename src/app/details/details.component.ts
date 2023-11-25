import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing-location/service/housing.service';
import { HousingLocation } from '../housing-location/interface/housinglocation';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: "details.component.css",
  templateUrl: "details.component.html",
})

export class DetailsComponent
{
  private readonly route: ActivatedRoute;
  private readonly housingService: HousingService;
  public housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(route: ActivatedRoute, housingService: HousingService)
  {
    this.route = route;
    this.housingService = housingService;
  }

  ngOnInit(): void
  {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    const housingLocation$: Observable<HousingLocation> = this.housingService.getHousingLocationById(housingLocationId);

    housingLocation$.subscribe(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication()
  {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
