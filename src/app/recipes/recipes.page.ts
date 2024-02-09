import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];
  recipesSub: Subscription;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesSub = this.recipesService.getRecipesListener().subscribe(recipes => this.recipes = recipes);
    this.recipesService.getAllRecipes();
  }

}
