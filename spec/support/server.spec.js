const request = require('request');

describe('calc', () => {
    it('should calculate 2 to the power of 3', () => {
        expect(2**3).toBe(8)
    })
})

describe('GET /ex1', function() {
    it('Should return 200 OK', function(done) {
        request.get('http://localhost:3000/ex1', (err, res) => {
            if (err) return done(err);
            console.log(res.statusCode, res.body);
            done();
        });
    });
});

describe('GET /ex2', function() {
    it('Should return 200 OK', function(done) {
        request.get('http://localhost:3000/ex2', (err, res) => {
            if (err) return done(err);
            console.log(res.statusCode, res.body);
            done();
        });
    });
});