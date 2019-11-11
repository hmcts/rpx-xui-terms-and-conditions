import { User } from "../interfaces/users";

export class UserDto {
    public userId: string;

    public static fromModel(model: User): UserDto {
        const u = new UserDto();
        u.userId = model.userId;
        return u;
    }

    public toModel(): User {
        return {
            userId: this.userId
        };
    }
}