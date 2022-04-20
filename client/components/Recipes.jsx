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

	closeModal() {
		this.setState({
			modalState: {
				...this.state.modalState,
				open: false,
			},
		});
	}

	render() {
		if (!this.state.fetchedRecipes)
			return (
				<div>
					<h1>Loading info, please wait...</h1>
				</div>
			);

		const { recipes } = this.state;

		if (!recipes) return null;

		if (!recipes.length) return <div>Sorry, no recipes found</div>;

		const recipeElems = recipes.map((recipe, i) => {
			return <RecipeCard key={i} info={recipe} openModal={this.openModal} />;
		});

		return (
			<section className='mainSection'>
				<header className='pageHeader'>
					<h2>Recipes</h2>
					<Link to={'/create'}>
						<button type='button' className='btnSecondary'>
							Create Recipe
						</button>
					</Link>
				</header>
				<div className='charContainer'>{recipeElems}</div>
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
