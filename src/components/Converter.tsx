import { h } from "preact";
import { useState } from "preact/hooks";
import { converter, JSONSchema } from "src/utils/converter";
import { generateRamlDataType } from "src/utils/generateRamlDataType";

export default function Converter() {
  const [textArea, setTextArea] = useState("");
  const [result, setResult] = useState<JSONSchema>(null);
  const [error, setError] = useState(null);

  const onHandlerTextArea = (e: h.JSX.TargetedEvent<HTMLTextAreaElement>) => {
    setTextArea(e.currentTarget.value);
  };

  const onHandlerConverter = (value: string) => {
    try {
      const json = JSON.parse(value);
      const prevResult = converter(json);
      setResult(prevResult);
      setError(null);
    } catch (error) {
      setError(error.name + error.message);
    }
  };

  const readClipboardText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTextArea(text);
    } catch (error) {
      setError(error.name + error.message);
    }
  };

  const writeClipboardText = async () => {
    try {
      const dataType = generateRamlDataType(result);
      await navigator.clipboard.writeText(dataType);
    } catch (error) {
      setError(error.name + error.message);
    }
  };

  return (
    <>
      <div class="flex justify-between">
        <button onClick={readClipboardText}>Pegar JSON</button>
        <button
          onClick={() => onHandlerConverter(textArea)}
          disabled={textArea === ""}
          className={`${
            textArea === ""
              ? "disabled:opacity-50 pointer-events-none text-gray-400"
              : "text-white"
          } block `}
        >
          Convertir
        </button>
        <button
          onClick={writeClipboardText}
          disabled={!Boolean(result)}
          className={`${
            !Boolean(result)
              ? "disabled:opacity-50 pointer-events-none text-gray-400"
              : "text-white"
          } block `}
        >
          Copiar DataType
        </button>
      </div>
      <div className="grid grid-cols-2 h-[calc(100vh-20rem)] overflow-auto">
        <textarea
          onInput={onHandlerTextArea}
          value={textArea}
          placeholder={`{"example":{"tool":"Mulesoft"}`}
          className="h-full px-4 block text-base text-slate-800 overflow-y-auto resize-none"
        />
        <div className="bg-blue-950/50 p-4">
          {result && (
            <div className="text-xs">
              <pre>{generateRamlDataType(result)}</pre>
            </div>
          )}
        </div>
      </div>
      <div>
        {error && (
          <p className="text-base text-white bg-red-500 p-2">{error}</p>
        )}
      </div>
    </>
  );
}
