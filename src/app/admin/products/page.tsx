"use client";

import { CrudTable, type Column, type Field } from "@/components/admin/CrudTable";
import { api, type Product, type Category } from "@/lib/api-client";

const columns: Column<Product>[] = [
  {
    key: "image_url",
    label: "",
    width: "70px",
    render: (r) =>
      r.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={r.image_url} alt={r.name} className="w-12 h-12 object-cover rounded" />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded" />
      ),
  },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (r) => `${Number(r.price).toFixed(2)} DT` },
  { key: "stock", label: "Stock" },
];

const fields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "stock", label: "Stock", type: "number" },
  {
    name: "category",
    label: "Category",
    type: "select",
    loadOptions: async () => {
      const d = await api.get<{ items: Category[] }>("/api/categories");
      return d.items.map((c) => c.name);
    },
  },
  { name: "image_url", label: "Image", type: "image", uploadEndpoint: "/api/products/upload" },
];

export default function AdminProductsPage() {
  return (
    <CrudTable<Product>
      title="Products"
      resource="products"
      listKey="items"
      itemKey="product"
      columns={columns}
      fields={fields}
    />
  );
}
