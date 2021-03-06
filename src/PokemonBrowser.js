import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import {connect} from 'react-redux'

import { imageUrl } from './config';
import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import { getPokemon, showForm } from './store/pokemon';

class PokemonBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }


  componentDidMount() {
    this.props.getPokemon();
  }

  handleCreated = (pokemon) => {
    this.setState({
      showForm: false,
    });
    this.props.handleCreated(pokemon)
  }

  showForm = () => {
    this.setState({
      showForm: true,
    })
  }

  render() {
    const pokemonId = Number.parseInt(this.props.match.params.pokemonId);
    if (!this.props.pokemon) {
      return null;
    }
    return (
      <main>
        <LogoutButton token={this.props.token} />
        <nav>
          <Fab hidden={this.state.showForm} onClick={this.showForm} />
          {this.props.pokemon.map(pokemon => {
            return (
              <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
                <div className={pokemonId === pokemon.id ? 'nav-entry is-selected' : 'nav-entry'}>
                  <div className="nav-entry-image"
                       style={{backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`}}>
                  </div>
                  <div>
                    <div className="primary-text">{pokemon.name}</div>
                    <div className="secondary-text">Born {new Date(pokemon.updatedAt).toDateString()}</div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>
        { this.state.showForm ?
          <PokemonForm token={this.props.token} handleCreated={this.handleCreated} /> :
          <Route path="/pokemon/:id" render={props =>
            <PokemonDetail {...props} token={this.props.token} />
          } />
        }
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon.list,
    //formVisible: state.pokemon.formVisible,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPokemon: () => dispatch(getPokemon()),
    //showForm: () => dispatch(showForm()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  PokemonBrowser
);
