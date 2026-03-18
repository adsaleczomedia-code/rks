"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";

type Category = {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
};

type FormData = {
    name: string;
    slug: string;
    isActive: boolean;
};

const initialFormData: FormData = {
    name: "",
    slug: "",
    isActive: true,
};

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal & Form State
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get<Category[]>("/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("API ERROR:", err);
            setError("Unable to load categories. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // --- POPUP HANDLERS ---

    const handleOpenCreate = () => {
        setFormData(initialFormData);
        setEditingId(null);
        setIsFormModalOpen(true);
    };

    const handleOpenEdit = (category: Category) => {
        setFormData({
            name: category.name,
            slug: category.slug,
            isActive: category.isActive,
        });
        setEditingId(category.id);
        setIsFormModalOpen(true);
    };

    const handleOpenDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    // --- CRUD OPERATIONS ---

    const confirmDelete = async () => {
        if (!categoryToDelete) return;
        setIsSubmitting(true);

        try {
            await api.delete(`/categories/${categoryToDelete.id}`);
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
            await fetchCategories(); // Refresh table
        } catch (err) {
            console.error("DELETE ERROR:", err);
            alert("Failed to delete the category. It might be in use.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                // EDIT (UPDATE)
                await api.put(`/categories/${editingId}`, formData);
            } else {
                // ADD (CREATE)
                await api.post("/categories", formData);
            }
            setIsFormModalOpen(false);
            await fetchCategories(); // Refresh table
        } catch (err) {
            console.error("SUBMIT ERROR:", err);
            alert("Failed to save the category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // --- RENDERERS ---

    if (loading && categories.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#5b52e3]"></div>
                <span className="ml-4 text-gray-600 font-medium">Loading categories...</span>
            </div>
        );
    }

    if (error && categories.length === 0) {
        return (
            <div className="p-10 text-center flex flex-col items-center mt-10">
                <p className="text-red-600 font-medium text-lg">{error}</p>
                <button
                    className="mt-6 rounded-lg bg-[#5b52e3] hover:bg-[#473ebd] transition-colors px-8 py-3 text-white font-semibold shadow-md shadow-[#5b52e3]/30"
                    onClick={fetchCategories}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto relative font-sans">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Categories</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage and organize your platform's categories.</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="bg-[#5b52e3] hover:bg-[#473ebd] text-white px-6 py-2.5 rounded-lg transition-all font-semibold flex items-center shadow-lg shadow-[#5b52e3]/30 active:scale-95"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Category
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b-2 border-[#5b52e3]/20">
                        <tr>
                            <th scope="col" className="p-5 font-bold tracking-wider">ID</th>
                            <th scope="col" className="p-5 font-bold tracking-wider">Name</th>
                            <th scope="col" className="p-5 font-bold tracking-wider">Slug</th>
                            <th scope="col" className="p-5 font-bold tracking-wider">Status</th>
                            <th scope="col" className="p-5 font-bold tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-gray-500 bg-gray-50/30">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p>No categories found. Create one to get started.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                                    <td className="p-5 font-semibold text-gray-900">{cat.id}</td>
                                    <td className="p-5 font-medium text-gray-800">{cat.name}</td>
                                    <td className="p-5 font-mono text-gray-500 text-xs bg-gray-50/50 rounded">{cat.slug}</td>
                                    <td className="p-5">
                                        <span
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${cat.isActive
                                                ? "bg-[#5b52e3]/10 text-[#5b52e3] border-[#5b52e3]/20"
                                                : "bg-gray-100 text-gray-600 border-gray-200"
                                                }`}
                                        >
                                            {cat.isActive ? "Enabled" : "Disabled"}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right space-x-4">
                                        <button
                                            onClick={() => handleOpenEdit(cat)}
                                            className="text-[#5b52e3] hover:text-[#473ebd] font-semibold transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenDelete(cat)}
                                            className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- ADD / EDIT POPUP (SAME SCREEN) --- */}
            {isFormModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="text-xl font-extrabold text-gray-900">
                                {editingId ? "Edit Category" : "Add New Category"}
                            </h2>
                            <button
                                onClick={() => setIsFormModalOpen(false)}
                                className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b52e3] focus:border-transparent transition-shadow text-gray-900"
                                        placeholder="e.g., Credit Cards"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        required
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b52e3] focus:border-transparent transition-shadow font-mono text-sm text-gray-700 bg-gray-50"
                                        placeholder="e.g., credit-cards"
                                    />
                                </div>

                                <div className="flex items-center pt-3 pb-1">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                        className="h-5 w-5 text-[#5b52e3] border-gray-300 rounded focus:ring-[#5b52e3] cursor-pointer transition-colors"
                                    />
                                    <label htmlFor="isActive" className="ml-3 text-sm font-bold text-gray-700 cursor-pointer select-none">
                                        Category is Active
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsFormModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 text-sm font-bold text-white bg-[#5b52e3] rounded-lg hover:bg-[#473ebd] disabled:opacity-60 flex items-center transition-all shadow-md shadow-[#5b52e3]/20 active:scale-95"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Saving...
                                        </span>
                                    ) : editingId ? (
                                        "Save Changes"
                                    ) : (
                                        "Create Category"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- DELETE CONFIRMATION POPUP (SAME SCREEN) --- */}
            {isDeleteModalOpen && categoryToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-8 text-center transform transition-all">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-5">
                            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delete Category</h3>
                        <p className="text-sm text-gray-500 mb-8">
                            Are you sure you want to delete <strong className="text-gray-900">"{categoryToDelete.name}"</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={isSubmitting}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60 transition-all w-full shadow-md shadow-red-600/20 active:scale-95 flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Yes, Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}