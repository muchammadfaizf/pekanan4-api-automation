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

  it('status 201', async () => {
   
    response = await createCategory(dataCategories, accessToken);
    expect(response.status).to.equal(201);
    categoryId = response.body.data.categoryId;
  });

  it('Status success', async () => {
    response = await createCategory(dataCategories, accessToken);
    expect(response.body).to.have.property('status').to.equal('success');
  });

  it('contain teks Customer berhasil ditambahkan', async () => {
    response = await createCategory(dataCategories, accessToken);  
    expect(response.body).to.have.property('message').to.equal('Category berhasil ditambahkan');
  });
});
  describe('Negative Case - Create Category', () => {
    it('Display invalid data', async () => {
      const invalidCategory = {}; 
      const response = await createCategory(invalidCategory, accessToken);
      expect(response.status).to.equal(400);
    
    });
});

describe('Select Single Category', () => {
    it('should retrieve the single category', async () => {
      const selectCategoryResponse = await getCategory(categoryId, accessToken);
      expect(selectCategoryResponse.status).to.equal(200);
    });
  });
  describe('Select Single Category (Negative Tests)', () => {
    it('should handle non-existent category', async () => {
      const nonExistentCategoryId = 'non_existent_category_id';
      const response = await getCategory(nonExistentCategoryId, accessToken);
      expect(response.status).to.equal(404); 
     
     });
  });

  describe('Update Category', () => {
    it('should update the created category', async () => {
      const response = await updateCategory(categoryId, accessToken, updateCategories);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('status').to.equal('success');
      expect(response.body.data).to.have.property('name').to.equal(updateCategories.name);   
      });
   });
describe('Update Category (Negative Tests)', () => {
  it('should handle invalid update data', async () => {
    const invalidupdateCategories = {}; 
    const response = await updateCategory(categoryId, accessToken, invalidupdateCategories);
    expect(response.status).to.equal(400); 
    
  });
});

describe('Delete Category', () => {
it('should delete the created category', async () => {
    const response = await deleteCategory(categoryId, accessToken);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('data').to.deep.equal({});
    });
  });
describe('Delete Category (Negative Tests)', () => {
it('should handle non-existent category for deletion', async () => {
    const nonExistentCategoryId = 'non_existent_customer_id';
    const response = await deleteCategory(nonExistentCategoryId, accessToken);
    expect(response.status).to.equal(404); 
 
    });
});
