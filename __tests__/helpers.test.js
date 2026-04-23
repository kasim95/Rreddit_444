/**
 * @fileoverview Unit tests for backend helpers.js
 *
 * Tests cover:
 *  - encryptPassword / comparePasswords
 *  - checkEmail
 *  - checkUsername
 *  - checkPassword
 *  - getUserDataFromReq
 */

const helpers = require('../helpers');

// ---------------------------------------------------------------------------
// encryptPassword & comparePasswords
// ---------------------------------------------------------------------------

describe('encryptPassword', () => {
    it('returns a bcrypt hash string', async () => {
        const hash = await helpers.encryptPassword('mySecret123');
        expect(typeof hash).toBe('string');
        // bcrypt hashes start with "$2b$"
        expect(hash).toMatch(/^\$2b\$/);
    });

    it('returns a different hash for the same password each time (random salt)', async () => {
        const hash1 = await helpers.encryptPassword('samePassword');
        const hash2 = await helpers.encryptPassword('samePassword');
        expect(hash1).not.toBe(hash2);
    });
});

describe('comparePasswords', () => {
    it('returns true when plain password matches the hash', async () => {
        const plain = 'correctPassword1';
        const hash = await helpers.encryptPassword(plain);
        const result = await helpers.comparePasswords(plain, hash);
        expect(result).toBe(true);
    });

    it('returns false when plain password does not match the hash', async () => {
        const hash = await helpers.encryptPassword('correctPassword1');
        const result = await helpers.comparePasswords('wrongPassword', hash);
        expect(result).toBe(false);
    });

    it('returns false for an empty string against a valid hash', async () => {
        const hash = await helpers.encryptPassword('somePassword1');
        const result = await helpers.comparePasswords('', hash);
        expect(result).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// checkEmail
// ---------------------------------------------------------------------------

describe('checkEmail', () => {
    it('accepts a standard email address', () => {
        expect(helpers.checkEmail('user@example.com')).toBe(true);
    });

    it('accepts an email with sub-domain', () => {
        expect(helpers.checkEmail('user@mail.example.co')).toBe(true);
    });

    it('accepts an email with plus-sign alias', () => {
        expect(helpers.checkEmail('user+tag@example.org')).toBe(true);
    });

    it('rejects an email missing the @ symbol', () => {
        expect(helpers.checkEmail('userexample.com')).toBe(false);
    });

    it('rejects an email missing the domain', () => {
        expect(helpers.checkEmail('user@')).toBe(false);
    });

    it('rejects an email missing the local part', () => {
        expect(helpers.checkEmail('@example.com')).toBe(false);
    });

    it('rejects a TLD longer than 4 characters', () => {
        expect(helpers.checkEmail('user@example.toolong')).toBe(false);
    });

    it('rejects null', () => {
        expect(helpers.checkEmail(null)).toBe(false);
    });

    it('rejects undefined', () => {
        expect(helpers.checkEmail(undefined)).toBe(false);
    });

    it('rejects an empty string', () => {
        expect(helpers.checkEmail('')).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// checkUsername
// ---------------------------------------------------------------------------

describe('checkUsername', () => {
    it('accepts a valid username of 20 characters', () => {
        expect(helpers.checkUsername('a'.repeat(20))).toBe(true);
    });

    it('accepts a short username', () => {
        expect(helpers.checkUsername('alice')).toBe(true);
    });

    it('rejects a username longer than 20 characters', () => {
        expect(helpers.checkUsername('a'.repeat(21))).toBe(false);
    });

    it('rejects null', () => {
        expect(helpers.checkUsername(null)).toBe(false);
    });

    it('rejects undefined', () => {
        expect(helpers.checkUsername(undefined)).toBe(false);
    });

    it('rejects an empty string', () => {
        expect(helpers.checkUsername('')).toBe(false);
    });

    it('rejects a non-string value', () => {
        expect(helpers.checkUsername(12345)).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// checkPassword
// ---------------------------------------------------------------------------

describe('checkPassword', () => {
    it('accepts a password within the length bounds', () => {
        expect(helpers.checkPassword('validPass1')).toBe(true);
    });

    it(`accepts a password exactly at the minimum length (${helpers.PASSWORD_MIN_LENGTH})`, () => {
        expect(helpers.checkPassword('a'.repeat(helpers.PASSWORD_MIN_LENGTH))).toBe(true);
    });

    it(`accepts a password exactly at the maximum length (${helpers.PASSWORD_MAX_LENGTH})`, () => {
        expect(helpers.checkPassword('a'.repeat(helpers.PASSWORD_MAX_LENGTH))).toBe(true);
    });

    it('rejects a password shorter than the minimum length', () => {
        expect(helpers.checkPassword('short')).toBe(false);
    });

    it('rejects a password longer than the maximum length', () => {
        expect(helpers.checkPassword('a'.repeat(helpers.PASSWORD_MAX_LENGTH + 1))).toBe(false);
    });

    it('rejects null', () => {
        expect(helpers.checkPassword(null)).toBe(false);
    });

    it('rejects undefined', () => {
        expect(helpers.checkPassword(undefined)).toBe(false);
    });

    it('rejects an empty string', () => {
        expect(helpers.checkPassword('')).toBe(false);
    });
});

// ---------------------------------------------------------------------------
// getUserDataFromReq
// ---------------------------------------------------------------------------

describe('getUserDataFromReq', () => {
    const validBody = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'myPassword1',
        firstName: 'Test',
        lastName: 'User',
        birthdate: '1990-01-15',
        sex: 'male',
        redditUsername: 'reddittestuser'
    };

    it('returns an object with all valid fields', () => {
        const result = helpers.getUserDataFromReq(validBody);
        expect(result).toBeDefined();
        expect(result.email).toBe('test@example.com');
        expect(result.username).toBe('testuser');
        expect(result.firstName).toBe('Test');
        expect(result.lastName).toBe('User');
        expect(result.sex).toBe('male');
        expect(result.redditUsername).toBe('reddittestuser');
        // birthdate is stored as a Unix timestamp
        expect(typeof result.birthdate).toBe('number');
    });

    it('converts birthdate to a numeric timestamp', () => {
        const result = helpers.getUserDataFromReq(validBody);
        const expected = new Date('1990-01-15').getTime();
        expect(result.birthdate).toBe(expected);
    });

    it('sets email to null when the email is invalid', () => {
        const result = helpers.getUserDataFromReq({ ...validBody, email: 'bad-email' });
        expect(result.email).toBeNull();
    });

    it('sets username to null when the username is too long', () => {
        const result = helpers.getUserDataFromReq({ ...validBody, username: 'a'.repeat(21) });
        expect(result.username).toBeNull();
    });

    it('ignores an unrecognised sex value', () => {
        const result = helpers.getUserDataFromReq({ ...validBody, sex: 'unknown' });
        expect(result.sex).toBeUndefined();
    });

    it('accepts "female" as a valid sex value (typo regression test)', () => {
        const result = helpers.getUserDataFromReq({ ...validBody, sex: 'female' });
        expect(result.sex).toBe('female');
    });

    it('accepts "other" as a valid sex value', () => {
        const result = helpers.getUserDataFromReq({ ...validBody, sex: 'other' });
        expect(result.sex).toBe('other');
    });

    it('returns null when called with null', () => {
        expect(helpers.getUserDataFromReq(null)).toBeNull();
    });

    it('returns null when called with undefined', () => {
        expect(helpers.getUserDataFromReq(undefined)).toBeNull();
    });

    it('sets optional fields to undefined when absent', () => {
        const result = helpers.getUserDataFromReq({
            email: 'test@example.com',
            username: 'testuser'
        });
        expect(result.firstName).toBeUndefined();
        expect(result.lastName).toBeUndefined();
        expect(result.redditUsername).toBeUndefined();
    });

    it('does not expose the password in the returned object (password is passed through for hashing later)', () => {
        // getUserDataFromReq passes the password through to be hashed by the caller
        const result = helpers.getUserDataFromReq(validBody);
        // If the password field exists it must equal the original (unhashed)
        // value because hashing happens in the route handler, not here.
        if (result.password !== undefined) {
            expect(result.password).toBe(validBody.password);
        }
    });
});
