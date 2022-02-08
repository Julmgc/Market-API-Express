// import { createConnection, getConnection } from 'typeorm';

// import { createUser, listUser, updateUser, deleteUser } from './user.service';

// describe('User Servie Test', () => {
//     beforeAll(async () => {
//         await createConnection();
//     });

//     afterAll(async () => {
//         const connection = getConnection();

//         await connection.close();
//     });

//     it('Should return a new user', async () => {
//         const user = await createUser({ name: 'Teste', email: 'teste@mail.com', password: '123' });

//         expect(user).toHaveProperty('id');
//         expect(user).toHaveProperty('email');
//         expect(user).toHaveProperty('name');

//         expect(user.name).toBe('Teste');
//         expect(user.password).not.toBe('123');
//     });
// });
