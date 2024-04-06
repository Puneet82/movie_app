import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const movie = await client.movie.findUnique({
            where: {
                id
            }
        });
        if (!movie) {
            return NextResponse.json({ status: 404 }, { message: "Movie not found" });
        }
        return NextResponse.json(movie);
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error getting movie", error });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { title, director, releaseYear } = body;

        const updateMovie = await client.movie.update({
            where: {
                id
            },
            data: {
                title,
                director,
                releaseYear
            }
        });
        if (!updateMovie) {
            return NextResponse.json({ status: 404 }, { message: "Movie not found" });
        }
        return NextResponse.json(updateMovie);
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error updating movie", error });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;
        await client.movie.delete({
            where: {
                id
            }
        });
        return NextResponse.json({ status: 200 }, { message: "Movie deleted" });
    } catch (error) {
        return NextResponse.json({ status: 500 }, { message: "Error deleting movie", error });
    }
};
