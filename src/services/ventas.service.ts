import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {CatalogoRepository, ClienteRepository, InventarioCatalogoRepository, SubVentaRepository, SucursalRepository, VendedorRepository, VentaRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class VentasService {
  constructor(
    @repository(InventarioCatalogoRepository)
    public inventarioCatalogoRepository: InventarioCatalogoRepository,

    @repository(SubVentaRepository)
    public subVentaRepository: SubVentaRepository,

    @repository(VentaRepository)
    public ventaRepository: VentaRepository,

    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,

    @repository(VendedorRepository)
    public vendedorRepository: VendedorRepository,

    @repository(SucursalRepository)
    public sucursalRepository: SucursalRepository,

    @repository(CatalogoRepository)
    public catalogoRepository: CatalogoRepository,
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

  //TODO: Implementar el método para obtener el producto más y menos vendido pero global, no para cada inventario

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


  //Calcular el subtotal de una subVenta
  async calcularSubTotal(inventarioCatalogoId: string, cantidad: number): Promise<number> {
    // Buscar el producto en el inventario
    const inventario = await this.inventarioCatalogoRepository.findOne({
      where: {_id: inventarioCatalogoId},
    });

    // Verificar si el inventario existe
    if (!inventario) {
      throw new Error(`No se encontró el producto en el inventario con ID: ${inventarioCatalogoId}`);
    }

    // Buscar el producto
    const producto = await this.catalogoRepository.findOne({
      where: {_id: inventario.catalogoId},
    });

    // Verificar si el producto existe
    if (!producto) {
      throw new Error(`No se encontró el producto con ID: ${inventario.catalogoId}`);
    }

    // Calcular el subtotal
    return producto.precio * cantidad;
  }

  //Metodo que me de todas las subVentas que tiene una venta, y el total de la suma de todas esas subVentas

  async obtenerSubVentasDeUnaVenta(ventaId: string): Promise<any> {
    const subVentas = await this.subVentaRepository.find({
      where: {ventaId: ventaId}
    });

    let total = 0;
    subVentas.forEach(subVenta => {
      total += subVenta.subTotal;
    });


    return {subVentas, total};
  }


  //Metodo que me retorne una factura con todas las subVentas de una venta, el total de la venta (sumando el subtotal de todas las subventas), el cliente, el vendedor y la sucursal
  //De la subVenta obtener el nombre del producto, la cantidad y el precio unitario
  async obtenerFactura(ventaId: string): Promise<any> {
    const subVentas = await this.subVentaRepository.find({
      where: {ventaId: ventaId}

    })

    let total = 0;
    const subVentasConNombreProducto = await Promise.all(
      subVentas.map(async (subVenta) => {
        total += subVenta.subTotal;

        // Buscar el producto para obtener su nombre
        const productoEnInventario = await this.inventarioCatalogoRepository.findOne({
          where: {_id: subVenta.inventarioCatalogoId},
        });

        // Verificar si el prosducto existe
        if (!productoEnInventario) {
          throw new Error(`No se encontró el producto en el inventario con con ID: ${subVenta.inventarioCatalogoId}`);
        }

        const producto = await this.catalogoRepository.findOne({
          where: {_id: productoEnInventario.catalogoId},
        });


        return {
          nombreProducto: producto ? producto.nombre : 'Producto no encontrado',
          cantidad: subVenta.cantidad,
          subTotal: subVenta.subTotal,
        };
      })
    );

    //Obtener la venta
    const venta = await this.ventaRepository.findOne({
      where: {_id: ventaId}
    });

    // Verificar si la venta existe
    if (!venta) {
      throw new Error(`No se encontró la venta con ID: ${ventaId}`);
    }

    //Obtener el nombre del cliente
    const cliente = await this.clienteRepository.findOne({
      where: {_id: venta.clienteId}
    });

    // Verificar si el cliente existe
    if (!cliente) {
      throw new Error(`No se encontró el cliente con el ID: ${venta.clienteId}`);
    }

    const nombreCliente = `${cliente.nombre} ${cliente.apellido}`;

    //Obtener el vendedor
    const vendedor = await this.vendedorRepository.findOne({
      where: {_id: venta.vendedorId}
    });

    // Verificar si el vendedor existe
    if (!vendedor) {
      throw new Error(`No se encontró el vendedor con el ID: ${venta.vendedorId}`);
    }

    const nombreVendedor = `${vendedor.nombre} ${vendedor.apellido}`;

    //Obtener la sucursal
    const sucursal = await this.sucursalRepository.findOne({
      where: {_id: venta.sucursalId}
    });

    // Verificar si la sucursal existe
    if (!sucursal) {
      throw new Error(`No se encontró la sucursal con el id: ${venta.sucursalId}`);
    }

    const nombreSucursal = sucursal.nombre;

    //Obtener la fecha
    const fecha = venta.fecha;

    //Obtener el tipo de venta
    const tipoVenta = venta.tipoVenta;


    return {subVentasConNombreProducto, total, nombreCliente, nombreVendedor, nombreSucursal, fecha, tipoVenta};
  }

  //Metodo que me de las ventas de una sucursal

  async obtenerVentasDeUnaSucursal(sucursalId: string): Promise<any> {
    const ventas = await this.ventaRepository.find({
      where: {sucursalId: sucursalId}
    });
    return {ventas};
  }





}


