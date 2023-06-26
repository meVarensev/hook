import { useLocalStorageState, useSessionStorageState } from "./use-storage";

import "./styles.css";
import { memo } from "react";

const MemoComponent = memo(function A() {
  return <div>Hello world</div>;
});

export default function App() {
  const [count, setCount] = useSessionStorageState("count", 0);

  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>Inc</button>

      <MemoComponent />
    </div>
  );
}
