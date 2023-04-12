import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dtos/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}

  private readonly limit: number = 650;

  async populateDB() {
    try {
      await this.pokemonModel.deleteMany({});
      const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}`);
      const promisePokemons: CreatePokemonDto[] = data.results.map((ele) => {
        const urlSplit = ele.url.split('/');
        const no = urlSplit[urlSplit.length - 2];
        return { no: +no, name: ele.name };
      });
      const pokemons = await Promise.all(promisePokemons);
      await this.pokemonModel.insertMany(pokemons);
      return `The pokemon database was successfully populated (${pokemons.length} registers inserted)`;
    } catch (error) {
      console.log('The pokemons database could not be populate', error);
      throw new InternalServerErrorException('The pokemons database could not be populate');
    }
  }
}
