import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

const Home = () => {
    const { isAuthor, isUser, category, fetchCategory, createCategory } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: "" });
    const [blogFromData, setBlogFormData] = useState({ title: "", details: "", total_views: 0, category: "", author: "" });
    console.log(category);

    const handleCategory = () => {
        createCategory(formData);
        setFormData({ name: "" });
        document.getElementById('categoryModal').close();
    }

    useEffect(() => {
        fetchCategory();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="bg-base-200 p-5">
            {isAuthor && <h1 className="text-xl text-center">Welcome, Author</h1>}
            {isUser && <h1 className="text-xl text-center">Welcome, User</h1>}
            {!isAuthor && !isUser && <h1 className="text-xl text-center">Welcome Guest</h1>}

            <div className="overflow-x-auto bg-white rounded-lg p-5 mt-3">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-xl">Blogs List</h1>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => document.getElementById('blogModal').showModal()}
                        >Create Blog</button>
                        <button
                            type="button"
                            className="btn btn-sm btn-success text-white"
                            onClick={() => document.getElementById('categoryModal').showModal()}
                        >Create Category</button>
                    </div>
                </div>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Category Modal */}
            <dialog id="categoryModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

                        <h3 className="font-bold text-sm uppercase">Create Category</h3>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">Category Name <span className="text-red-400">*</span> </span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter Category Name"
                                className="input input-bordered"
                            />
                            {formData.name === "" && <p className="text-red-700 mt-2">**Category Name is Required</p>}
                        </div>

                        <div className="form-control mt-3">
                            <button className="btn btn-sm btn-primary w-fit mx-auto" onClick={handleCategory}>Create</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Blog Modal */}
            <dialog id="blogModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

                        <h3 className="font-bold text-sm uppercase">Create Blog</h3>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">Blog Title <span className="text-red-400">*</span> </span>
                            </label>
                            <input
                                type="text"
                                value={blogFromData.title}
                                onChange={(e) => setBlogFormData({ ...blogFromData, title: e.target.value })}
                                placeholder="Enter Blog Title"
                                className="input input-bordered"
                            />
                            {blogFromData.title === "" && <p className="text-red-700 mt-2">**Blog Title is Required</p>}
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">
                                <span className="label-text">Blog Details <span className="text-red-400">*</span> </span>
                            </label>
                            <textarea
                                value={blogFromData.details}
                                onChange={(e) => setBlogFormData({ ...blogFromData, details: e.target.value })}
                                placeholder="Enter Blog Details"
                                className="textarea textarea-bordered"
                            ></textarea>
                            {blogFromData.details === "" && <p className="text-red-700 mt-2">**Blog Details is Required</p>}
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">
                                <span className="label-text">Category <span className="text-red-400">*</span> </span>
                            </label>
                            <select
                                value={blogFromData.category}
                                onChange={(e) => setBlogFormData({ ...blogFromData, category: e.target.value })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Category</option>
                                {category.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {blogFromData.category === "" && <p className="text-red-700 mt-2">**Category is Required</p>}
                        </div>
                        <div className="form-control mt-2">
                            <label className="label">
                                <span className="label-text">Author <span className="text-red-400">*</span> </span>
                            </label>
                            <input
                                type="text"
                                value={blogFromData.author}
                                onChange={(e) => setBlogFormData({ ...blogFromData, author: e.target.value })}
                                placeholder="Enter Author"
                                className="input input-bordered"
                            />
                            {blogFromData.author === "" && <p className="text-red-700 mt-2">**Author is Required</p>}
                        </div>
                        <div className="form-control mt-3">
                            <button className="btn btn-sm btn-primary w-fit mx-auto" onClick={handleCategory}>Create</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Home;