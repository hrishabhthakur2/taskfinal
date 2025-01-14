// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneById(id: Types.ObjectId | string): Promise<User | null> {
    if (typeof id === 'string') {
      id = new Types.ObjectId(id);
    }
    return this.userModel.findById(id).exec();
  }

  async findOne(filter: Partial<User>): Promise<User | null> {
    return this.userModel.findOne(filter).exec();
  }

  // Add these new methods for GraphQL
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: Types.ObjectId | string, updateData: Partial<User>): Promise<User | null> {
    if (typeof id === 'string') {
      id = new Types.ObjectId(id);
    }
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async remove(id: Types.ObjectId | string): Promise<User | null> {
    if (typeof id === 'string') {
      id = new Types.ObjectId(id);
    }
    return this.userModel.findByIdAndDelete(id).exec();
  }
}