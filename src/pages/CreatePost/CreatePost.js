import styles from './CreatePost.module.css'
import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAutenticacao } from '../../hooks/useAutenticacao'
const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formerror, setFormError] = useState("")

  const {InsertDocument, response} = useInsertDocument("posts")
  const {user} = useAuthValue

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validar url da imagem

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }





    //criar o array de tags

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


    // chegar todos os valores
if (!title || !image || !tags || !body){
  setFormError("Por favor, preencha todos os campos.")
}

if (formerror) return;

      InsertDocument({
        title,
        image,
        body,
        tagsArray
        
      })

      //redirect

    navigate("/");
  }


  return (
    <div className={styles.create_post}>
       <h2>Criar post</h2>
       <p>Escreve sobre o que você quiser e compartilhe seu conhecimenteo!</p>
       <form onSubmit={handleSubmit}>

        <label>
          <span>Titulo</span>
          <input type="text" name="title" required  placeholder='Pense em um bom titulo..'
          onChange={(e) => setTitle(e.target.value)} value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input type="text" name="image" required  placeholder='insira uma imagem que represente seu post'
          onChange={(e) => setImage(e.target.value)} value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
         <textarea name="body" required placeholder='Insira o conteudo do post' onChange={(e) => setBody (e.target.value)} value={body}></textarea> 
        </label>

        <label>
          <span>Tags</span>
          <input type="text" name="tags" required  placeholder='insira as tags separadas por vírgula'
          onChange={(e) => setTags(e.target.value)} value={tags}
          />
        </label>

       

        {! response.loading && <button className='btn'>Cadastrar</button>}
       {response.loading && <button className='btn' disabled>aguarde...</button> }
       {response.error && <p className='error'>{response.error}</p>} 
       {formerror && <p className='error'>{formerror}</p>} 

       </form>
    </div>
  )
}

export default CreatePost