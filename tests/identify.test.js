const request = require('supertest');
const app = require('../app'); 

describe('Zamazon Contact Web Service Tests', () => {
    // Test the root endpoint
    test('GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Zamazon Contact Web Service!');
    });

    // Test the /identify endpoint

    // Test the /identify endpoint for new contact
    test('POST /identify - New primary contact', async () => {
        const response = await request(app)
            .post('/identify')
            .send({ email: 'newuser@email.com1', phoneNumber: '9871' });

        expect(response.statusCode).toBe(200);
        expect(response.body.linkPrecedence).toBe('primary');
    });

        // Test the /identify endpoint for new contact with existing email
    test('POST /identify - Secondary contact', async () => {
        const response = await request(app)
            .post('/identify')
            .send({ email: 'newuser@email.com1', phoneNumber: '98761' });

        expect(response.statusCode).toBe(200);
        expect(response.body.linkPrecedence).toBe('secondary');
    });

    // Test the /identify endpoint for existing secondary contact with existing phone number
    test('POST /identify - Existing Secondary contact', async () => {
        const response = await request(app)
            .post('/identify')
            .send({ email: 'existingsecondary@email.com1', phoneNumber: '98761' });

            expect(response.statusCode).toBe(200);
            expect(response.body.linkPrecedence).toBe('secondary');
    });

});
