import axios from "axios";
import index from "../src/index";

interface IObjectConstructor {
  [key: string]: string | number | boolean;
}

interface IData {
  status?: number;
  message?: string;
  body?: IObjectConstructor;
}

describe("INDEX TESTS >> :", function () {
  axios.defaults.baseURL = `http://${process.env.HOST}:${process.env.PORT}/`;
  const message =
    "Welcome to the terraform-k8s API, here are the details of your request:";

  beforeAll(() => {
    index;
  });

  afterAll(() => {
    index.close();
  });

  describe("TESTS FOR THE GET METHOD", () => {
    const data: IData = {};
    beforeAll(async () => {
      try {
        const response = await axios.get("/");
        data.status = response.status;
        data.message = response.data.body.response;
        data.body = response.data.body.body;
      } catch (error) {
        console.log(error);
      }
    });
    it("should have a response of type object: GET", () => {
      expect(typeof data.body).toEqual("object");
    });
    it("should return 200 success status: GET", () => {
      expect(data.status).toBe(200);
    });
    it("expect response message to be the same", () => {
      expect(data.message).toEqual(message);
    });
  });

  describe("TESTS FOR THE POST METHOD", () => {
    const data: IData = {};
    const body = { username: "xyz", password: "xyz" };
    beforeAll(async () => {
      try {
        const response = await axios.post("/", body);
        data.status = response.status;
        data.message = response.data.body.response;
        data.body = response.data.body.body;
      } catch (error) {
        console.log(error);
      }
    });
    it("should have a response of type object: POST", () => {
      expect(typeof data.body).toEqual("object");
    });
    it("should return 200 success status: POST", () => {
      expect(data.status).toBe(200);
    });
    it("expect response message to be the same", () => {
      expect(data.message).toEqual(message);
    });
    it("expect response body to be the same", () => {
      expect(data.body).toEqual(body);
    });
  });
});
