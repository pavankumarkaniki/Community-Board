export default function PostCard({ post }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <small>Category: {post.category}</small>
      <p>Votes: {post.votes}</p>
    </div>
  );
}
