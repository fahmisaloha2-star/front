"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { ImageDrop } from "@/components/ImageDrop";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "email" | "select" | "boolean" | "image";
  options?: string[];
  loadOptions?: () => Promise<string[]>;
  uploadEndpoint?: string; // for type === "image"
  required?: boolean;
};

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
};

type Props<T extends { id: string }> = {
  title: string;
  resource: string; // e.g. "products"
  listKey: "items";
  itemKey: string; // e.g. "product"
  columns: Column<T>[];
  fields: Field[];
  initialValues?: Partial<T>;
};

export function CrudTable<T extends { id: string }>({
  title,
  resource,
  listKey,
  itemKey,
  columns,
  fields,
  initialValues = {},
}: Props<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get<Record<string, T[]>>(`/api/${resource}`);
      setRows(data[listKey] || []);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [resource]);

  const handleSave = async (values: Record<string, unknown>) => {
    setSaving(true);
    try {
      const payload = coerce(values, fields);
      if (editing) {
        const data = await api.put<Record<string, T>>(`/api/${resource}/${editing.id}`, payload);
        setRows((r) => r.map((row) => (row.id === editing.id ? data[itemKey] : row)));
        toast.success("Updated");
      } else {
        const data = await api.post<Record<string, T>>(`/api/${resource}`, payload, true);
        setRows((r) => [data[itemKey], ...r]);
        toast.success("Created");
      }
      setEditing(null);
      setCreating(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`/api/${resource}/${id}`);
      setRows((r) => r.filter((row) => row.id !== id));
      toast.success("Deleted");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{rows.length} item(s)</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:brightness-110"
        >
          <Plus size={16} /> New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No items yet — click <b>New</b> to add one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {columns.map((c) => (
                  <th key={String(c.key)} className="text-left px-4 py-3 font-medium" style={{ width: c.width }}>
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {columns.map((c) => (
                    <td key={String(c.key)} className="px-4 py-3 text-gray-800">
                      {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setEditing(row)}
                      className="text-gray-500 hover:text-primary mr-2"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-gray-500 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {(editing || creating) && (
        <FormModal
          title={editing ? "Edit" : "Create"}
          fields={fields}
          initial={editing ? (editing as unknown as Record<string, unknown>) : initialValues}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}

function FormModal({
  title,
  fields,
  initial,
  onClose,
  onSave,
  saving,
}: {
  title: string;
  fields: Field[];
  initial: Record<string, unknown>;
  onClose: () => void;
  onSave: (values: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [values, setValues] = useState<Record<string, unknown>>({ ...initial });
  const set = (k: string, v: unknown) => setValues((s) => ({ ...s, [k]: v }));
  const [dynOptions, setDynOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fields.forEach((f) => {
      if (f.type === "select" && f.loadOptions && !dynOptions[f.name]) {
        f.loadOptions()
          .then((opts) => setDynOptions((d) => ({ ...d, [f.name]: opts })))
          .catch(() => setDynOptions((d) => ({ ...d, [f.name]: [] })));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-secondary">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(values);
          }}
          className="p-6 space-y-4"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
                {f.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  value={(values[f.name] as string) || ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  rows={4}
                  required={f.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              ) : f.type === "select" ? (
                <select
                  value={(values[f.name] as string) || ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  required={f.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">—</option>
                  {(f.options ?? dynOptions[f.name] ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === "image" ? (
                <ImageDrop
                  value={(values[f.name] as string) || ""}
                  onChange={(url) => set(f.name, url || "")}
                  endpoint={f.uploadEndpoint || "/api/products/upload"}
                />
              ) : f.type === "boolean" ? (
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!values[f.name]}
                    onChange={(e) => set(f.name, e.target.checked)}
                  />
                  Enabled
                </label>
              ) : (
                <input
                  type={f.type === "number" ? "number" : f.type || "text"}
                  step={f.type === "number" ? "any" : undefined}
                  value={(values[f.name] as string | number | undefined) ?? ""}
                  onChange={(e) =>
                    set(f.name, f.type === "number" ? e.target.value : e.target.value)
                  }
                  required={f.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-5 py-2 rounded-lg hover:brightness-110 flex items-center gap-2 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function coerce(values: Record<string, unknown>, fields: Field[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = values[f.name];
    if (v === "" || v === undefined || v === null) continue;
    if (f.type === "number") {
      const n = Number(v);
      if (!Number.isNaN(n)) out[f.name] = n;
    } else if (f.type === "boolean") {
      out[f.name] = !!v;
    } else {
      out[f.name] = v;
    }
  }
  return out;
}
