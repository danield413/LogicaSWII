import { Client, expect } from "@loopback/testlab";
import { MsLogicaApplication } from "../../application"; // Asegúrate de que este sea el nombre correcto de tu aplicación
import { setupApplication } from "../../utils/test-helper"; // Este helper se encarga de configurar la aplicación para las pruebas

describe("Pruebas generales de la APP", () => {
  let app: MsLogicaApplication;
  let client: Client;

  // Configuración de la aplicación antes de las pruebas (usando beforeAll de Jest)
  beforeAll(async () => {
    ({ app, client } = await setupApplication());
  });

  // Parada de la aplicación después de las pruebas (usando afterAll de Jest)
  afterAll(async () => {
    await app.stop();
  });
  // Caso de prueba: Obtener productos
  it("Debe retornar una lista de productps", async () => {
    const response = await client.get("/catalogos"); // Realiza una solicitud GET a /products
    expect(response.body).to.be.an.Object(); // Verifica que la ifica el contenido del primer producto
  });

  it("Debe retornar una lista de subventas", async () => {
    const response = await client.get("/subventas"); // Realiza una solicitud GET a /products
    expect(response.body).to.be.an.Object(); // Verifica que la ifica el contenido del primer producto
  });

  it("Debe retornar una lista de ventas", async () => {
    const response = await client.get("/ventas"); // Realiza una solicitud GET a /products
    expect(response.body).to.be.an.Object(); // Verifica que la ifica el contenido del primer producto
  });

  it("El valor de una venta debe ser mayor a 0", async () => {
    const response = await client.post("/ventas").send({
      fecha: new Date(),
      tipoVenta: "En punto de venta",
      totalPagado: 0,
      vendedorId: "----------",
      clienteId: "------------",
      sucursalId: "----------"
    });

    expect(response.body.error.message).to.be.an.String();
  });


});
