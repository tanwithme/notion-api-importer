/**
 * Map Notion page properties to a plain JavaScript record. Supports common
 * property types such as title, rich text, number, select, multi-select,
 * checkbox, date, url, email, phone_number, people, relation, rollup and formula.
 * Unrecognized types are returned as-is under their key.
 * @param properties Raw properties object from a Notion page
 */
export function mapProperties(properties: any): Record<string, any> {
  const result: Record<string, any> = {};
  if (!properties) return result;
  for (const key of Object.keys(properties)) {
    const prop: any = properties[key];
    switch (prop.type) {
      case "title":
        result[key] = (prop.title || []).map((t: any) => t.plain_text).join("");
        break;
      case "rich_text":
        result[key] = (prop.rich_text || []).map((t: any) => t.plain_text).join("");
        break;
      case "number":
        result[key] = prop.number;
        break;
      case "select":
        result[key] = prop.select ? prop.select.name : undefined;
        break;
      case "multi_select":
        result[key] = Array.isArray(prop.multi_select) ? prop.multi_select.map((opt: any) => opt.name) : [];
        break;
      case "checkbox":
        result[key] = prop.checkbox;
        break;
      case "date":
        if (prop.date) {
          result[key] = prop.date.start;
          if (prop.date.end) {
            result[`${key}_end`] = prop.date.end;
          }
        }
        break;
      case "url":
      case "email":
      case "phone_number":
        result[key] = prop[prop.type];
        break;
      case "people":
        result[key] = Array.isArray(prop.people) ? prop.people.map((p: any) => p.name) : [];
        break;
      case "relation":
        result[key] = Array.isArray(prop.relation) ? prop.relation.map((rel: any) => rel.id) : [];
        break;
      case "rollup":
        result[key] = prop.rollup;
        break;
      case "formula": {
        const f = prop.formula;
        if (!f) {
          result[key] = undefined;
        } else if (f.type === "string") {
          result[key] = f.string;
        } else if (f.type === "number") {
          result[key] = f.number;
        } else if (f.type === "boolean") {
          result[key] = f.boolean;
        } else if (f.type === "date") {
          result[key] = f.date ? f.date.start : undefined;
        } else {
          result[key] = f;
        }
        break;
      }
      default:
        // fallback: assign the underlying value if present
        result[key] = (prop as any)[prop.type];
        break;
    }
  }
  return result;
}
