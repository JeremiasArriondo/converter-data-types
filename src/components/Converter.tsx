import { useState } from "preact/hooks";

export default function Converter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const onHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="h-screen">
      <div class="flex justify-between">
        <button>Pegar JSON</button>
        <button className="block">Convertir</button>
        <button>Copiar DataType</button>
      </div>
      <div className="grid grid-cols-2 h-[calc(100vh-4rem)] overflow-auto">
        <textarea
          onKeyUp={onHandler}
          value={JSON.stringify(JSON.parse(input), null, 4)}
          className="block text-xs text-base-dark overflow-y-auto"
        />
      </div>
    </div>
  );
}
