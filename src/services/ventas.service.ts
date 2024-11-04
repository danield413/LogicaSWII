import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Catalogo, InventarioCatalogo} from '../models';
import {CatalogoRepository, InventarioCatalogoRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {model} from '@loopback/repository';



@injectable({scope: BindingScope.TRANSIENT})
export class VentasService {
  constructor(
    @repository(InventarioCatalogoRepository)
    public inventarioCatalogoRepository: InventarioCatalogoRepository
  ) {}

  /*
   * Add service methods here
   */

  async reducirStock(productoId: string, cantidad: number): Promise<void> {
    // Paso 1: Buscar el producto en el inventario
    const inventarioCatalogo = await this.inventarioCatalogoRepository.findOne({
      where: {_id: productoId},
    });

    // Validar si el producto existe en el inventario
    if (!inventarioCatalogo) {
      throw new HttpErrors.NotFound(`Producto con id ${productoId} no encontrado en el inventario.`);
    }

    // Paso 2: Validar que el stock sea suficiente
    if (inventarioCatalogo.stock < cantidad) {
      throw new HttpErrors.BadRequest('No hay suficiente stock para la cantidad solicitada.');
    }

    // Paso 3: Actualizar el stock
    inventarioCatalogo.stock -= cantidad;

    // Paso 4: Guardar los cambios en el inventario
    await this.inventarioCatalogoRepository.updateById(inventarioCatalogo._id, {
      stock: inventarioCatalogo.stock,
    });
  }

}
