const { handler } = require('../netlify/functions/interpret.js');

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        choices: [{ message: { content: 'interpreted message' } }]
      })
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test('responds with 200 and expected body', async () => {
  const event = { body: JSON.stringify({ dream: 'a lovely dream' }) };
  const response = await handler(event);

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toEqual({ result: 'interpreted message' });
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
