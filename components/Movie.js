import React from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Movie = ({ movie }) => {
    const router = useRouter();
    const [movieToEdit, setMovieToEdit] = React.useState(movie); 
    const [showModalEdit, setShowModalEdit] = React.useState(false); 
    const [showDeleteModal, setShowDeleteModal] = React.useState(false); 

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMovie = await prisma.movie.update({
        where: {
          id: movie.id,
        },
        data: movieToEdit,
      });
      console.log(updatedMovie);
    } catch (error) {
      console.error("Error updating movie:", error);
    } finally {
      setShowModalEdit(false);
      router.reload();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteMovie = async () => {
    try {
      await prisma.movie.delete({
        where: {
          id: movie.id,
        },
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setShowDeleteModal(false);
      router.reload();
    }
  };

  return (
    <li className="p-3 my-5 bg-slate-300" key={movie.id}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => {
            setShowModalEdit(true);
            setMovieToEdit(movie);
          }}
        >
          Edit
        </button>

        <Modal showModal={showModalEdit} setShowModal={setShowModalEdit}>
          <form className="w-full px-5 pb-6" onSubmit={handleEditSubmit}>
            <h1>Add or Update a Movie</h1>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2 mb-3"
              value={movieToEdit.title}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="w-full p-2 mb-3"
              value={movieToEdit.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Director"
              name="director"
              className="w-full p-2 mb-3"
              value={movieToEdit.director}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Release Year"
              name="releaseYear"
              className="w-full p-2 mb-3"
              value={movieToEdit.releaseYear}
              onChange={handleChange}
            />
            <button type="submit" className="bg-blue-700 text-white px-5 py-2">
              Submit
            </button>
          </form>
        </Modal>
        <button
          className="text-red-700 mr-3"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
        <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl pb-3">
              Are you sure you want to delete this movie?
            </h1>
            <div className="space-x-4">
              <button
                className="text-blue-700 font-bold"
                onClick={handleDeleteMovie}
              >
                Yes
              </button>
              <button
                className="text-red-700 font-bold"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Movie;
