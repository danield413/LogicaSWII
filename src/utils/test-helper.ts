import { createRestAppClient } from "@loopback/testlab";
import { MsLogicaApplication } from "../application"; // Asegúrate de cambiarlo al nombre correcto de tu aplicación

export async function setupApplication() {
  const app = new MsLogicaApplication();
  await app.boot();
  await app.start();

  const client = createRestAppClient(app);
  return { app, client };
}
