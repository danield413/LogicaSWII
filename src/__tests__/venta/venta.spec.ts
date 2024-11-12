import { Client, expect } from "@loopback/testlab";
import { MsLogicaApplication } from "../../application"; // Asegúrate de que este sea el nombre correcto de tu aplicación
import { setupApplication } from "../../utils/test-helper"; // Este helper se encarga de configurar la aplicación para las pruebas

describe("CatalogoController", () => {
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
  it("should return a list of products", async () => {
    const response = await client.get("/catalogos"); // Realiza una solicitud GET a /products
    expect(response.body).to.be.an.Object(); // Verifica que la ifica el contenido del primer producto
  });

  it("should return a list of subventas", async () => {
    const response = await client.get("/subventas"); // Realiza una solicitud GET a /products
    expect(response.body).to.be.an.Object(); // Verifica que la ifica el contenido del primer producto
  });
});
