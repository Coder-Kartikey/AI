import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    setNotes(data || []);
  };

  const saveNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (editingId) {
      await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("notes").insert({
        title,
        content,
        user_id: user.id,
      });
    }

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Notes</h2>
            <p className="text-sm text-gray-500">
              All your notes in one place
            </p>
          </div>
          <button
            className="text-sm text-gray-600 hover:text-gray-900 underline"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>

        {/* Editor */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-8">
          <input
            className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Write your note here..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg font-medium"
            onClick={saveNote}
          >
            {editingId ? "Update Note" : "Add Note"}
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.length === 0 && (
            <p className="text-gray-500 text-sm">
              No notes yet. Create your first note above.
            </p>
          )}
        <div className="mt-8 space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {note.title}
              </h3>

              <p className="text-sm text-gray-600 whitespace-pre-line">
                {note.content}
              </p>

              <div className="mt-4 flex gap-4 text-sm">
                <button
                  className="text-indigo-600 hover:underline"
                  onClick={() => {
                    setEditingId(note.id);
                    setTitle(note.title);
                    setContent(note.content);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-red-500 hover:underline"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
