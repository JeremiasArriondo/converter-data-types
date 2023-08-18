export const generateRamlDataType = (obj, level = 0, isFirstLevel = true) => {
    let result = isFirstLevel ? "#%RAML 1.0 DataType\n\n" : "";

    for (const [key, value] of Object.entries(obj)) {
      if (value === "vacio") {
        result += `${"  ".repeat(level)}${key}: string\n`;
      } else if (typeof value === "object") {
        result += `${"  ".repeat(level)}${key}:\n`;
        result += generateRamlDataType(value, level + 1, false);
      } else {
        result += `${"  ".repeat(level)}${key}: ${value}\n`;
      }
    }

    return result;
  };