const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const Todo = require('../models/todoSchema');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = "New Text";

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                   return done(err);
                }
                Todo.find().then((doc) => {
                    expect(doc.length).toBe(1);
                    expect(doc[0].text).toBe(text);
                    done();
                }).catch(err => done(err));
                
            })
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({ })
            .expect(400)
            .end((err, res) => {
                if(err){
                   return done(err);
                }
                Todo.find().then((doc) => {
                    expect(doc.length).toBe(0);
                    done();
                }).catch(err => done(err));
                
            });
    });
});