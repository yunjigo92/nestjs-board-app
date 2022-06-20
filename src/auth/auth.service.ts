import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialDto : AuthCredentialDto) : Promise<User>{
        return this.userRepository.createUser(authCredentialDto);
    }    


    async signIn(authCredentialDto : AuthCredentialDto) : Promise<{accessToken : string}>{
        const{ username, password} = authCredentialDto;
        const user = await this.userRepository.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))){
            // user token 생성
            const payload = { username: username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken : accessToken};
        }

    }

}
