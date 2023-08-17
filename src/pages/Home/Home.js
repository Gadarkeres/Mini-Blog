//CSS
import Styles from "./Home.module.css"

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/UseFetchDocuments";


//components
import PostDetail from "../../components/PostDetail";

export const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={Styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>
        <form onSubmit={handleSubmit} className={Styles.search_form}>
          <input type="text" name="" placeholder="Ou busque por tags" />
          <button className="btndark" onChange={(e)=> setQuery(e.target.value)}>Pesquisar</button>
        </form>

        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) =>(
            <PostDetail key={post.id} post = {post}/>
          ))}
          {posts && posts.length === 0 &&(
            <div className={Styles.noposts}>
              <p>Não foram encontrados posts</p>
              <Link to="posts/create" className="btn" > Criar primeiro post</Link>
            </div>
          )}
        </div>
    </div>
  )
}
export default Home;
