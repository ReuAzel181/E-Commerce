import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
  userphoto: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'sally',
      password: '123',
      userphoto: 'http://localhost:8080/user1.png',
    },
    {
      userId: 2,
      username: 'maria',
      password: '123',
      userphoto: 'http://localhost:8080/user2.png',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneById(userId: number): Promise<User | undefined> {
    console.log("Searching for user with ID:", userId);
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
        console.error(`User with ID ${userId} not found.`);
    }
    return user;
}

}

