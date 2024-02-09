import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  alertButtons = [{
    text: 'Cancel',
    role: 'cancel',
    handler: () => {}
  }, {
    text: 'Delete',
    handler: () => {
      this.recipesService.deleteRecipe(this.loadedRecipe.id);
      this.router.navigate(['/recipes']);
    }
  }];

  recipeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeSub = this.recipesService.getRecipeListener().subscribe(recipe => this.loadedRecipe = recipe);
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('recipeId');
      if(!recipeId) return;
      this.recipesService.getRecipe(recipeId);
    })
  }

}
