import { AdminPanel } from "@/components/admin-panel";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Галерея «до / после»</h1>
      <p className="mt-2 text-slate-600">Загрузка и удаление фото доступны только после входа.</p>
      <AdminPanel />
    </div>
  );
}
