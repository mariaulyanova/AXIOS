const { expect } = require('chai');
const axios = require('axios').default;

const baseURL = 'https://petstore.swagger.io/v2/';
const storeURL = `${baseURL}store/order/`;

describe('API Testing', async () => {
  let createdPetId;
  let orderId;

  it('Should create a pet', async () => {
    const petData = {
      name: "Lion",
    };

    try {
      const createResponse = await axios.post(`${baseURL}pet`, petData);
      createdPetId = createResponse.data.id;

      expect(createResponse.status).to.equal(200);
      expect(createResponse.data.name).to.equal('Lion');
    } catch (error) {
      throw error;
    }
  });

  it('Should place an order for the created pet and validate the response', async () => {
    const orderData = {
      petId: createdPetId,
      quantity: 1,
      shipDate: "2023-09-19T11:24:08.966Z",
      status: "placed",
      complete: true
    };

    try {
      const orderResponse = await axios.post(storeURL, orderData);
      orderId = orderResponse.data.id;

      expect(orderResponse.status).to.equal(200);
      expect(orderResponse.data.status).to.equal('placed');
    } catch (error) {
      throw error;
    }
  });

  it('Should find a purchase order by ID and validate the response', async () => {
    try {
      const orderResponse = await axios.get(`${storeURL}${orderId}`);

      expect(orderResponse.status).to.equal(200);
      expect(orderResponse.statusText).to.equal('OK');
    } catch (error) {
      throw error;
    }
  });

  it('Should delete a purchase order by ID and validate the response', async () => {
    try {
      const response = await axios.delete(`${storeURL}${orderId}`);
      expect(response.status).to.equal(200);
    } catch (error) {
      throw error;
    }
  });

  it('Should find a purchase order by ID and validate the response', async () => {
    try {
      const orderResponse = await axios.get(`${storeURL}${orderId}`);
      expect(orderResponse.status).to.equal(404);
    } catch (error) {
      throw error;
    }
  });
});
