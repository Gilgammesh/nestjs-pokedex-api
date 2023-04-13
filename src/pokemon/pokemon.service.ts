import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { UpdatePokemonDto } from './dtos/update-pokemon.dto';
import { QueryPaginationDto } from 'src/common/dtos/query-pagination.dto';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  private readonly defaultLimit = AppConfig().defaultLimit;
  private readonly defaultOffset = AppConfig().defaultOffset;

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      this.handleExceptions(error, 'The pokemon could not be created');
    }
  }

  async findAll(queryPaginationDto: QueryPaginationDto) {
    const limit = queryPaginationDto.limit || this.defaultLimit;
    const offset = queryPaginationDto.offset || this.defaultOffset;
    try {
      const count = await this.pokemonModel.count();
      const pokemons = await this.pokemonModel
        .find()
        .sort({ no: 1 })
        .skip((limit - 1) * offset)
        .limit(offset);
      return {
        page: limit,
        registers: pokemons.length,
        total: count,
        data: pokemons
      };
    } catch (error) {
      console.log('Could not list the pokemons', error);
      throw new InternalServerErrorException('Could not list the pokemons');
    }
  }

  async findOne(term: string) {
    let field = '';
    let pokemon: Pokemon | null = null;
    const regexText = /^[a-zA-Z\s]+$/;

    // MongoId
    if (!pokemon && isValidObjectId(term)) {
      field = 'id';
      pokemon = await this.pokemonModel.findById(term);
    }

    // No Number
    if (!pokemon && !isNaN(+term)) {
      field = 'no';
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // Name String
    if (!pokemon && regexText.test(term)) {
      field = 'name';
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`The Pokemon with ${field} ${term} was not found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne(updatePokemonDto);
      const updatedPokemon = await this.pokemonModel.findById(pokemon._id);
      return updatedPokemon;
    } catch (error) {
      this.handleExceptions(error, 'The pokemon could not be updated');
    }
  }

  async remove(id: string) {
    const deletedPokemon = await this.pokemonModel.findByIdAndDelete(id);
    if (!deletedPokemon) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    }
    return;
  }

  private handleExceptions(error: any, msg: string) {
    if (error.code === 11000) {
      console.log(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(msg, error);
    throw new InternalServerErrorException(msg);
  }
}
