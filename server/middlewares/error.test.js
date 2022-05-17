const { notFoundError, generalError } = require("./errors");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
describe("Given a notFoundError function", () => {
  describe("When it's invoked with a response", () => {
    test("Then it should call the response status method with a 404", () => {
      const expectedResult = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedResult);
    });

    test("Then it should call the response json method with a msg '404 Page Not Found'", () => {
      const expectedMsg = { msg: "404 endpoint Not Found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedMsg);
    });
  });
});

describe("Given a genralError function", () => {
  describe("When it's invoked with a response and a 401 error and a error message 'general error'", () => {
    test("Then it should call the response status method with 401 and the json method with the passed error msg", () => {
      const expectedStatus = 401;
      const expectedJsonMessage = { msg: "general error" };
      const error = {
        statusCode: 401,
        message: "general error",
      };

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJsonMessage);
    });
    describe("When it's invoked with a response and a 500 error and a error message 'Internal server error'", () => {
      test("Then it should call the response status method with 500 and the json method with the passed error msg", () => {
        const expectedStatus = 500;

        const error = {
          statusCode: 500,
          message: "Internal server error",
        };

        const expectedJsonMessage = { msg: "Internal server error" };

        generalError(error, null, res);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith(expectedJsonMessage);
      });
    });
  });
});
