const bcrypt = require('bcrypt');
export const hashBcrypt = async (plainValue: string) => {
    try {
        return await bcrypt.hash(plainValue, 10);
    } catch (error) {
        return error;
    }
};
export const compareBcrypt = async (plainValue: string, hashCode: string) => {
    try {
        return await bcrypt.compare(plainValue, hashCode);
    } catch (error) {
        return error;
    }
};
export const generateUniqueID = () => {
    const digits = String(Math.floor(Math.random() * 8888888888 + 1000000000));
    if (digits.length === 10) return digits;
    return null;
};
export const generateOTP = () => {
    const digits = String(Math.floor(Math.random() * 888888 + 100000));
    if (digits.length === 6) return digits;
    return null;
};
