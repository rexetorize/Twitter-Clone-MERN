class UserDto {
    id;
    activated;
    createdAt;
    name;
    username;
    pfp;
    coverImage;
    __v;
    bio;
    website;

    constructor(user) {
        this._id = user._id;
        this.activated = user.activated;
        this.name = user.name;
        this.username = user.username;
        this.pfp = user.pfp ;
        this.coverImage = user.coverImage;
        this.__v = user.__v;
        this.bio = user.bio;
        this.website = user.website;
        this.followers = user.followers;
        this.following = user.following;
    }
}

module.exports = UserDto;