// import app from "./App.js";
// import { connectDB } from "./Config/Database.js";

// connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(
//     `server is listening on Port: ${process.env.PORT} or http://localhost:4000`
//   );
// });

import app from "./App.js";
import { connectDB } from "./Config/Database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
