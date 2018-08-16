const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const Todo = require('../models/todoSchema');

const todos = [
    { text: 'test todo1', _id: new ObjectID() },
    { text: 'test todo2', _id: new ObjectID() }
]

// beforeEach((done) => {
//     //Todo.remove({}).then(() => done());

//     Todo.insertMany(todos).then(()=> done());
// });

// describe('POST /todos', () => {
//     it('should create new todo', (done) => {
//         var text = "New Text";

//         request(app)
//             .post('/todos')
//             .send({ text })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if(err){
//                    return done(err);
//                 }
//                 Todo.find().then((doc) => {
//                     expect(doc.length).toBe(1);
//                     expect(doc[0].text).toBe(text);
//                     done();
//                 }).catch(err => done(err));
                
//             })
//     });

//     it('should not create todo with invalid body data', (done) => {
//         request(app)
//             .post('/todos')
//             .send({ })
//             .expect(400)
//             .end((err, res) => {
//                 if(err){
//                    return done(err);
//                 }
//                 Todo.find().then((doc) => {
//                     expect(doc.length).toBe(0);
//                     done();
//                 }).catch(err => done(err));
                
//             });
//     });

// });

describe('Get /todos/:id', () => {

    // it('should return todo doc', (done) => {
    //     request(app)
    //         .get(`/todos/${todos[0]._id.toHexString()}`)
    //         .send()
    //         .expect(200)
    //         .expect(res => {
    //             expect(res.body.todo.text).toBe(todos[0].text);

    //         })
    //         .end(done);
    // });

    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .send()
            .expect(404)
            .end(done);
    });

    it('should return 404 if non-object ids', done => {
        request(app)
            .get(`/todos/123`)
            .send()
            .expect(404)
            .end(done);
    });
})