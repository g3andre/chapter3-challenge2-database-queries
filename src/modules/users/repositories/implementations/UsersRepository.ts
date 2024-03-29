import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne(user_id,{relations: ['games']});
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query('SELECT * FROM users ORDER BY first_name ASC'); // Complete usando raw query
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository
      .query(`SELECT * FROM users WHERE LOWER(first_name) = 
              '${first_name.toLowerCase()}' AND LOWER(last_name) = '${last_name.toLowerCase()}'`); // Complete usando raw query
  }
}
