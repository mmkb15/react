import { useState } from "react";

export default function () {
  const [count, setCount] = useState(10);
  const name = "Mina";
  return (
    <>
      <h1>App Page</h1>
      <p>Hello {name}</p>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
}
