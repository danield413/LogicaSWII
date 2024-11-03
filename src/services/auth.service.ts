import {injectable, BindingScope} from '@loopback/core';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  private readonly jwtSecret = 'lalalaSWII-2024'; // Usa una clave secreta más segura y guárdala en las variables de entorno.
  private readonly jwtExpiresIn = '24h'; // Configura la duración del token (1 hora en este ejemplo)

  constructor() {}

  // Método para verificar un token JWT
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Método para generar un token JWT
  async generateToken(data: any): Promise<string> {
    const token = jwt.sign(data, this.jwtSecret, {expiresIn: this.jwtExpiresIn});
    return token;
  }

  // Método para encriptar una contraseña
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de sal para encriptación
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  // Método para comparar una contraseña proporcionada con la almacenada encriptada
  async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(providedPass, storedPass);
    return isMatch;
  }
}
