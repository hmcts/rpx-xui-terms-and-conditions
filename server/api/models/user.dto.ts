import { User } from '../interfaces/users';

export class UserDto {
    // TODO remove userId we do not want to be store the userId on the node layer
    public userId: string;

    public static fromModel(model: User): UserDto {
        const u = new UserDto();
        u.userId = model.userId;
        return u;
    }

    public toModel(): User {
        return {
            userId: this.userId,
        };
    }
}
