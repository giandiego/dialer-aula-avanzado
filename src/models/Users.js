import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!isEmail(value)) {
                throw new Error({error: 'Dirección de correo inválida'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Encriptar el password antes de guardarlo en el model user
    const user = this
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8)
    } 
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generar un método de autenticación para el usuario
    const user = this
    const token = sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Buscar el usuario por email y password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error('Credenciales de login inválidas')
    }
    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch) {                             
        throw new Error('Credenciales de login inválidas')
    }
    return user
}

const User = model('User', userSchema)

export default User