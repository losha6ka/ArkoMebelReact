// import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
// import fs from "fs";

// const projectId = "demo-project";

// let testEnv;

// beforeAll(async () => {
//     testEnv = await initializeTestEnvironment({
//         projectId,
//         firestore: {
//             rules: fs.readFileSync("firestore.rules", "utf8"),
//         },
//     });
// });

// afterAll(async () => {
//     await testEnv.cleanup();
// });

// test("user can read own cart", async () => {
//     const alice = testEnv.authenticatedContext("alice").firestore();
//     const cartRef = alice.collection("carts").doc("alice");
//     await cartRef.set({ items: [] }); // запись должна пройти
//     await expect(cartRef.get()).resolves.toBeDefined(); // чтение должно пройти
// });

// test("user cannot read other user's cart", async () => {
//     const alice = testEnv.authenticatedContext("alice").firestore();
//     const bob = testEnv.authenticatedContext("bob").firestore();
//     const aliceCart = alice.collection("carts").doc("alice");
//     await aliceCart.set({ items: [] });

//     const bobCart = bob.collection("carts").doc("alice");
//     await expect(bobCart.get()).rejects.toThrow(); // доступ должен быть запрещён
// });
