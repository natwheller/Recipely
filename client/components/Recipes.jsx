import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RecipeCard from './RecipeCard';
import DetailsModal from './DetailsModal';

class Recipes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchedRecipes: false,
			recipes: [],
			modalState: {
				open: false,
				type: null,
				position: { top: 0, left: 0 },
				id: null,
			},
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	// when this function is invoked, data is sent in json format and recipes are stored in state
	componentDidMount() {
		fetch('/api/')
			.then((res) => res.json())
			.then((recipes) => {
				if (!Array.isArray(recipes)) recipes = [];
				return this.setState({
					recipes,
					fetchedRecipes: true,
				});
			})
			.catch((err) =>
				console.log('Recipes.componentDidMount: get recipes: ERROR: ', err)
			);
	}

	// these are just event handlers!
	// when we open the details, we change open to 'true' in state
	// these props get updated on RecipeCard onclick
	// the div modal only shows up as an html element if the icon is clicked!
	openModal(type, position, id) {
		this.setState({
			modalState: {
				...this.state.modalState,
				open: true,
				type,
				position,
				id,
			},
		});
	}

	// these are just event handlers!
	// when we close the details, we change open to 'false' in state
	closeModal() {
		this.setState({
			modalState: {
				...this.state.modalState,
				open: false,
			},
		});
	}

	// if fetched recipes is false, we render 'loading' message
	render() {
		if (!this.state.fetchedRecipes)
			return (
				<div>
					<h4>Loading info, please wait...</h4>
				</div>
			);

		// this.state.recipes
		const { recipes, ingredients } = this.state;

		if (!recipes) return null;

		if (!recipes.length) return <div>Sorry, no recipes found</div>;

		// pass props to recipe card (key, info, and ability to invoke openModal)
		const recipeElems = recipes.map((recipe, i) => {
			return (
				<RecipeCard
					key={i}
					id={recipe.recipe_id}
					info={recipe}
					openModal={this.openModal}
				/>
			);
		});

		return (
			// renders the main section for recipes, create button, each recipe card & modals
			<section className='mainSection'>
				<header className='pageHeader'>
					<Link to={'/create'}>
						<button type='button' className='btnnav'>
							Create Recipe
						</button>
					</Link>
					<Link to={'/search'}>
						<button type='button' className='btnnav'>
							Search for a Recipe
						</button>
					</Link>
				</header>
				<div className='recipeContainer'>{recipeElems}</div>
				{this.state.modalState.open && (
					<DetailsModal
						type={this.state.modalState.type}
						position={this.state.modalState.position}
						id={this.state.modalState.id}
						closeModal={this.closeModal}
					/>
				)}
			</section>
		);
	}
}

export default Recipes;
