import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialDto : AuthCredentialDto) : Promise<User>{
        const {username, password} = authCredentialDto;
        const user = this.create({username, password});

        return await this.save(user);
    }
}