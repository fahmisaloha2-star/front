"use client";

import { CrudTable, type Column, type Field } from "@/components/admin/CrudTable";
import type { Category } from "@/lib/api-client";

const columns: Column<Category>[] = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  {
    key: "description",
    label: "Description",
    render: (r) => (
      <span className="text-gray-600 line-clamp-1">{r.description || "—"}</span>
    ),
  },
];

const fields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "slug", label: "Slug (auto-generated if empty)" },
  { name: "description", label: "Description", type: "textarea" },
];

export default function AdminCategoriesPage() {
  return (
    <CrudTable<Category>
      title="Categories"
      resource="categories"
      listKey="items"
      itemKey="category"
      columns={columns}
      fields={fields}
    />
  );
}
