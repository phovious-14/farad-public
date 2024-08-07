"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <span className="text-white">{error.message}</span>
        </div>
    )
}