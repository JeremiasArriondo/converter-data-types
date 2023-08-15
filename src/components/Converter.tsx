import { useState } from "preact/hooks";

export default function Converter() {
  const json = JSON.stringify({
    test: "prueba",
    numero: 1,
    camion: ["uno", "dos", "tres"],
    pruebaObjeto: {
      key1: "string",
      key2: 1,
    },
    test1: "prueba",
    numero1: 1,
    camion1: ["uno", "dos", "tres"],
    auto: {
      conductor: {
        nombre: "Jeremias",
      },
    },
    pruebaObjeto1: {
      key1: "string",
      key2: 1,
    },
    test2: "prueba",
    numero2: 1,
    camion2: ["uno", "dos", "tres"],
    pruebaObjeto2: {
      key1: "string",
      key2: 1,
    },
    auto2: {
      conductor: {
        nombre: "Jeremias",
      },
    },
  });
  const [input, setInput] = useState(json);
  const [result, setResult] = useState("");

  const onHandler = (e) => {
    setInput(e.target.value);
  };

  const converter = (json) => {
    if (typeof json !== "object" || json === null) {
      return { type: typeof json };
    }

    if (Array.isArray(json)) {
      return {
        type: "array",
        items: converter(json[0]),
      };
    }

    const properties = {};
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        properties[key] = converter(json[key]);
      }
    }

    return {
      type: "object",
      properties,
    };
  };

  const generateRamlDataType = (obj, level = 0) => {
    let result = "";

    for (const [key, value] of Object.entries(obj)) {
      if (value === "vacio") {
        result += `${"  ".repeat(level)}${key}: string\n`;
      } else if (typeof value === "object") {
        result += `${"  ".repeat(level)}${key}:\n`;
        result += generateRamlDataType(value, level + 1);
      } else {
        result += `${"  ".repeat(level)}${key}: ${value}\n`;
      }
    }

    return result;
  };

  return (
    <div className="h-screen">
      <div class="flex justify-between">
        <button>Pegar JSON</button>
        <button
          className="block"
          onClick={() => setResult(converter(JSON.parse(input)))}
        >
          Convertir
        </button>
        <button>Copiar DataType</button>
      </div>
      <div className="grid grid-cols-2 h-[calc(100vh-4rem)] overflow-auto">
        <textarea
          onKeyUp={onHandler}
          value={JSON.stringify(JSON.parse(input), null, 4)}
          className="block text-xs text-base-dark overflow-y-auto"
        />
        <div className="bg-violet-400/30 border border-violet-600 p-4">
          {result && (
            <div className="text-xs ">
              #%RAML 1.0 DataType <br />
              <pre>{generateRamlDataType(result)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
