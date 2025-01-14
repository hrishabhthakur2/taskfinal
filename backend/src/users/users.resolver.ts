// users.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './dto/user.type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { nullable: true })
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('createUserInput') createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Mutation(() => UserType)
  async removeUser(@Args('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}