import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({name, email, driver_license, password, avatar, id }) : Promise<User> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });
        
        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string) : Promise<User> {
        const user = await this.repository.findOne({ email })

        return user;
    }

    async findById(id: string) : Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export { UsersRepository };