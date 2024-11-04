import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {InventarioCatalogoRepository, SubVentaRepository} from '../repositories';



@injectable({scope: BindingScope.TRANSIENT})
export class VentasService {
  constructor(
    @repository(InventarioCatalogoRepository)
    public inventarioCatalogoRepository: InventarioCatalogoRepository,

    @repository(SubVentaRepository)
    public subVentaRepository: SubVentaRepository,

  ) { }

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

  async obtenerProductoMasYMenosVendido(): Promise<any> {
    // Consulta para el producto más vendido
    const [productoMasVendido] = await this.subVentaRepository.dataSource
      .connector?.collection('SubVenta')
      .aggregate([
        {$group: {_id: '$inventarioCatalogoId', total: {$sum: '$cantidad'}}},
        {$match: {total: {$gt: 0}}},  // Solo productos con ventas > 0
        {$sort: {total: -1}},
        {$limit: 1},
      ])
      .toArray();

    // Consulta para el producto menos vendido
    const [productoMenosVendido] = await this.subVentaRepository.dataSource
      .connector?.collection('SubVenta')
      .aggregate([
        {$group: {_id: '$inventarioCatalogoId', total: {$sum: '$cantidad'}}},
        {$match: {total: {$gt: 0}}},  // Solo productos con ventas > 0
        {$sort: {total: 1}},
        {$limit: 1},
      ])
      .toArray();

    return {productoMasVendido, productoMenosVendido};
  }
}


