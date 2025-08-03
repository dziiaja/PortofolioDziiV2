import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { motion } from 'framer-motion';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Ambil komentar
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Submit komentar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('comments').insert([
      { name, comment }
    ]);
    if (error) {
      console.error(error);
      alert('Error submitting comment');
    } else {
      setName('');
      setComment('');
      fetchComments();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:gap-8 gap-8 mb-10">
    {/* Form Komentar */}
    <div className="md:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-indigo-400">
        Leave a Comment
        </h2>
        <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[#181828] p-6 rounded-lg"
        >
        <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-[#0d0d1a] text-white"
        />
        <textarea
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 rounded bg-[#0d0d1a] text-white"
        />
        <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 from-indigo-500 to-gray-300 text-white rounded hover:bg-indigo-700 transition"
        >
            Submit Comment
        </button>
        </form>
    </div>

    {/* Riwayat Komentar */}
    <div className="md:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-indigo-400">
        Recent Comments
        </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-3 scrollbar-hide">
        {comments.map((c) => (
            <div
            key={c.id}
            className="bg-[#181828] p-4 rounded-lg text-white flex flex-col"
            >
            <strong>{c.name}</strong>
            <span>{c.comment}</span>
            <span className="text-sm text-gray-400 mt-2">
                {new Date(c.created_at).toLocaleString()}
            </span>
            </div>
        ))}
        </div>
    </div>
    </div>

  );
};

export default CommentSection;
