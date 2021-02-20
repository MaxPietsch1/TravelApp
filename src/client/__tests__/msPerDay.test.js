import { msPerDay } from "../js/countdown";

describe("Test to see if function returns total milliseconds for a day", () => {
  test("Testing the oneDay() calculation", () => {
    expect(msPerDay()).toBe(86400000);
  });
});
