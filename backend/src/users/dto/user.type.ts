import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType('User') // Added name for GraphQL schema
export class UserType {
  @Field(() => ID, { description: 'The unique identifier of the user' })
  @IsNotEmpty()
  _id: string;

  @Field(() => String, { description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Date, { description: 'When the user was created' })
  @IsDate()
  createdAt: Date;

  @Field(() => Date, { description: 'When the user was last updated' })
  @IsDate()
  updatedAt: Date;
}

// Also create an Input type for updates (typically needed for mutations)
@InputType('UpdateUserInput')
export class UpdateUserInput {
  @Field(() => String, { nullable: true, description: 'The updated name of the user' })
  @IsString()
  @IsOptional()
  name?: string;
}