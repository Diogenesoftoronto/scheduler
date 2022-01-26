import useDays from '/home/dio/lighthouse/scheduler2/src/components/hooks/useDays.js'

test("useDays returns an array", () => {
  const result = useDays('http://localhost:8001/api/days', []);
  expect(Array.isArray(result)).toEqual(true);
});
test("useDays returns an array", () => {
  const result = useDays('http://localhost:8001/api/days', []);
  console.log(result)
  expect(result.length).toEqual(5);
});
