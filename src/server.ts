import app from "./app";
import { connectDatabase } from "./database";

connectDatabase();

app.listen(3000, () => {
  console.log(`Running at http://localhost:3000`);
});
