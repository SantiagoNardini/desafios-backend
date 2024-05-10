const mongoose = require('mongoose')
const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest("mongodb://localhost:27017/ecommerce") 

describe("testing del Proyecto", () => {
    describe("test de products", () => {
        it("testing de enpoint POST /products debe crear un producto correctamente", async () => {
            const productMock = {
                title: "Botines grises",
                description: "botines con tacon grises",
                category: "botas",
                price: 2050,
                code: "anr121",
                stock: 23,
                thumbnail: "https://inside-sho.com/354799/botines-con-tacon-y-hebilla.webp",
                status: true
            };

            const resp = await requester.post("/products").send(productMock);

            // Assert response status code
            expect(resp.status).to.equal(201)
        });
        it("testing de enpoint GET /products debe traer todos los productos correctamente", async()=>{
            const{_body, ok, statusCode}= await requester.get("/products")
            expect(ok).to.be.true
            expect(statusCode).to.be.equal(201)
        })
    })
})