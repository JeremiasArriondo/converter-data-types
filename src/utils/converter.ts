export type JSONType = "string" | "number" | "boolean" | "object" | "array" | "null" | "undefined";

export interface JSONSchema {
    type: JSONType;
    items?: JSONSchema;
    properties?: { [key: string]: JSONSchema };
};

export const converter = (json: any): JSONSchema => {
    if (typeof json !== "object" || json === null) {
      return { type: typeof json as JSONType };
    }

    if (Array.isArray(json)) {
      return {
        type: "array",
        items: converter(json[0]),
      };
    }

    const properties: { [key: string]: JSONSchema } = {};
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