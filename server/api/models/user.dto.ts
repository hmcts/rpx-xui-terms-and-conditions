import { User } from '../interfaces/users';

export class UserDto {
    // TODO: not sure if this gets store within the node environment's memory if it does
    // we need to remove it, so that we can keep the node layer stateless.
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
