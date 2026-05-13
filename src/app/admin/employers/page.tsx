"use client";

import { CrudTable, type Column, type Field } from "@/components/admin/CrudTable";
import type { Employer } from "@/lib/api-client";

const columns: Column<Employer>[] = [
  {
    key: "photo_url",
    label: "",
    width: "70px",
    render: (r) =>
      r.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.photo_url} alt={r.full_name} className="w-12 h-12 object-cover rounded-full" />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded-full" />
      ),
  },
  { key: "full_name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

const fields: Field[] = [
  { name: "full_name", label: "Full name", required: true },
  { name: "role", label: "Role / Title" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "photo_url", label: "Photo", type: "image", uploadEndpoint: "/api/employers/upload" },
  { name: "bio", label: "Bio", type: "textarea" },
];

export default function AdminEmployersPage() {
  return (
    <CrudTable<Employer>
      title="Team / Employers"
      resource="employers"
      listKey="items"
      itemKey="employer"
      columns={columns}
      fields={fields}
    />
  );
}
