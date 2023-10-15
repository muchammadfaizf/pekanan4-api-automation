const { createCategory } = require('../object/createCategory');
const { deleteCategory } = require('../object/deleteCategory');
const { getCategory } = require('../object/getCategory');
const { login } = require('../object/login');
const { updateCategory } = require('../object/updateCategory');

const chai = require('chai');
const expect = chai.expect;
const dataLogin = require("../data/dataLogin.json");
const dataCategories = require("../data/dataCategories.json");
const updateCategories = require("../data/updateCategories.json");



let accessToken;
let response; 
let categoryId ;  

describe('Add Category', () => {
  before(async () => {
    const loginResponse = await login(dataLogin);
    accessToken = loginResponse.body.data.accessToken;
  });

  it('Add Category Success (Response 201)', async () => {
   
    response = await createCategory(dataCategories, accessToken);
    expect(response.status).to.equal(201);
    categoryId = response.body.data.categoryId;
  });
  it('Validate add category name', async () => {
    const response = await updateCategory(categoryId, accessToken, dataCategories);
    expect(response.body.data).to.have.property('name').to.equal(dataCategories.name);   
    });
  
});
  describe('Negative Case - Create Category', () => {
    it('Display invalid data response', async () => {
      const invalidCategory = {}; 
      const response = await createCategory(invalidCategory, accessToken);
      expect(response.status).to.equal(400);
    
    });
});

describe('Get Category', () => {
    it('Get category Success ( Response 200 )', async () => {
      const selectCategoryResponse = await getCategory(categoryId, accessToken);
      expect(selectCategoryResponse.status).to.equal(200);
    });
  });
  describe('Negative Case - Get Category', () => {
    it('Display invalid data response', async () => {
      const nonExistentCategoryId = 'non_existent_category_id';
      const response = await getCategory(nonExistentCategoryId, accessToken);
      expect(response.status).to.equal(404); 
     
     });
  });

  describe('Update Category', () => {
    it('Update category Success ( Response 200 )', async () => {
      const response = await updateCategory(categoryId, accessToken, updateCategories);
      expect(response.status).to.equal(200);  
      });
      it('Validate updated category name', async () => {
        const response = await updateCategory(categoryId, accessToken, updateCategories);
        expect(response.body.data).to.have.property('name').to.equal(updateCategories.name);   
        });
   });
describe('Negative Case - Update Category', () => {
  it('Display invalid data response', async () => {
    const invalidupdateCategories = {}; 
    const response = await updateCategory(categoryId, accessToken, invalidupdateCategories);
    expect(response.status).to.equal(400); 
    
  });
});

describe('Delete Category', () => {
it('Delete category Success ( Response 200 )', async () => {
    const response = await deleteCategory(categoryId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').to.deep.equal({});
    });
    it('Validate data is empty', async () => {
      const response = await deleteCategory(categoryId, accessToken);
      expect(response.body).to.have.property('data').to.deep.equal({});
      });

  });
describe('Negative Case - Delete Category', () => {
it('Display invalid data response', async () => {
    const nonExistentCategoryId = 'non_existent_customer_id';
    const response = await deleteCategory(nonExistentCategoryId, accessToken);
    expect(response.status).to.equal(404); 
 
    });
});
