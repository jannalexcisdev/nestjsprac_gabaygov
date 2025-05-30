import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword:string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}

export async function comparePasswords(rawPassword:string, hash: string) {
    return await bcrypt.compare(rawPassword, hash);
}