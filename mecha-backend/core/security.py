import bcrypt

def hash_password(password: str) -> str:
    # bcrypt expects bytes, so we encode the string
    pwd_bytes = password.encode('utf-8')
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    # Return as a string to store in MongoDB
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Encode both to bytes for comparison
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_byte_enc = hashed_password.encode('utf-8')
    # Use bcrypt's native check function
    return bcrypt.checkpw(password_byte_enc, hashed_password_byte_enc)